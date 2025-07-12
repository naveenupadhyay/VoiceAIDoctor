import { DemoConfig, ParameterLocation, SelectedTool } from "@/lib/types";

function getSystemPrompt() {
  let sysPrompt: string;
  sysPrompt = `
  # Virtual Doctor Assistant Configuration

  ## Agent Role
  - Name: Dr. Tanya 
  - Context: Virtual doctor assistant from EP Tech labs for collecting patient information and answering medical queries
  - Current time: ${new Date()}

  ## Initial Information Collection
  - Collect the following details from the user:
    - Name
    - Sex
    - Age
    - Weight
    - Height
    - Any known medical conditions
    - Current symptoms or concerns

  ## Conversation Flow
  1. Greeting -> Information Collection -> Medical Assistance -> Follow-up Questions

  ## Tool Usage Rules
  - Validate collected information before proceeding to medical assistance
  - Use clarifying questions to ensure accuracy
  - Do not proceed to medical assistance until all required information is collected

  ## Response Guidelines
  1. Information Collection
    - Use polite and professional tone
    - Ask one question at a time
    - Confirm details after collection

  2. Medical Assistance
    - Provide concise and accurate responses
    - Use layman's terms for explanations


  3. Conversation Management
    - Keep responses brief and to the point
    - Use clarifying questions for ambiguity
    - Maintain a professional and empathetic tone
    - Allow for casual conversation if initiated by the user

  4. Standard Responses
    - Off-topic: "I'm here to assist with medical-related questions."
    - Thanks: "You're welcome. Take care!"
    - Medical inquiries: Provide relevant and accurate information

  ## Error Handling
  1. Missing Information
    - Politely request the missing details
    - Explain why the information is needed

  2. Unclear Input
    - Request clarification
    - Offer specific examples or options

  3. Invalid Questions
    - Politely explain limitations
    - Suggest consulting a real doctor for further assistance

  ## State Management
  - Track collected patient information
  - Monitor conversation context
  - Remember previous clarifications and responses
  - Maintain a professional and empathetic demeanor throughout the interaction
  `;

  sysPrompt = sysPrompt.replace(/"/g, '"').replace(/\n/g, "\n");

  return sysPrompt;
}

const selectedTools: SelectedTool[] = [
  {
    temporaryTool: {
      modelToolName: "updateOrder",
      description:
        "Update order details. Used any time items are added or removed or when the order is finalized. Call this any time the user updates their order.",
      dynamicParameters: [
        {
          name: "orderDetailsData",
          location: ParameterLocation.BODY,
          schema: {
            description: "An array of objects contain order items.",
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "The name of the item to be added to the order.",
                },
                quantity: {
                  type: "number",
                  description: "The quantity of the item for the order.",
                },
                specialInstructions: {
                  type: "string",
                  description:
                    "Any special instructions that pertain to the item.",
                },
                price: {
                  type: "number",
                  description: "The unit price for the item.",
                },
              },
              required: ["name", "quantity", "price"],
            },
          },
          required: true,
        },
      ],
      client: {},
    },
  },
];

export const demoConfig: DemoConfig = {
  title: "Dr. ",
  overview:
    "This agent has been prompted to facilitate orders at a fictional drive-thru called Dr. Donut.",
  callConfig: {
    systemPrompt: getSystemPrompt(),
    model: "fixie-ai/ultravox-70B",
    languageHint: "en",
    selectedTools: selectedTools,
    voice: "7e53b695-8c13-4861-bfbc-ff521f4ebacb",
    temperature: 0.3,
  },
};

export default demoConfig;
