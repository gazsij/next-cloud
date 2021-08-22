import { FastifyInstance, FastifyRequest } from "fastify";

import { Folder } from "../../Repositories/FolderRepository";
import { SuccessSchema } from "../../Types/Schemas/Generic";

interface IRequest {
	uid: string,
	name: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/rename", {
		schema: {
			tags: ["Folder"],
			body: {
				type: "object",
				required: ["uid"],
				properties: {
					uid: { type: "string" },
					name: { type: "string" },
				}
			},
			response: {
				200: {
					type: "object",
					properties: SuccessSchema
				}
			}
		}
	}, async (req: FastifyRequest) => {
		try {
			const { uid, name } = req.body as IRequest;
			return {
				ok: true,
				status: 200,
				data: await Folder.Rename(uid, name)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};