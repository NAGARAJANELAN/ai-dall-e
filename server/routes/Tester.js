import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const response = await openai.createImage({
  prompt: "a white siamese cat",
  n: 3,
  size: "1024x1024",
});
// console.log(response.data);
console.log(response.data.data[0].url);
console.log(response.data.data[1].url);
// console.log(response.data.data[2].url);
