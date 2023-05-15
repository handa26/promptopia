import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    console.log(params.query);

    const prompt = await Prompt.find({
      tag: params.query,
    }).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all", {
      status: 500,
    });
  }
};
