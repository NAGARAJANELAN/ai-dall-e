import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const response = await openai.createImage({
  prompt: "a white siamese cat",
  n: 1,
  size: "1024x1024",
});
console.log(response.data.data[0].url);
