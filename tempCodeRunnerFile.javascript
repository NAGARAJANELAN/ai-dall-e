import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const response = await openai.createImage({
  prompt: "A cute baby sea otter",
  n: 1,
  size: "1024x1024",
});

console.log(response.data.data[0].url);