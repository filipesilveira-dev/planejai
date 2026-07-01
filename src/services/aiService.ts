// Função criada para fazer integração com IA: chama a API do Gemini com os resultados da consulta

// o GEMINI declara muito mais coisas que isso, mas isso é o que será utilizado no código
interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

export interface InsightData {
  feasibility: {
    status: "viable" | "needs_adjustment" | "unfeaseble";
    content: string;
  };
  diagnosis: {
    content: string;
  };
  suggestions: {
    items: string[];
  };
  extraIncome: {
    items: string[];
  };
  investment: {
    items: string[];
  };
  motivation: {
    content: string;
  };
}

// variável de ambiente criada e sendo atribuída a API_KEY por meio de "import.meta.env"
const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY);
const MODEL_NAME = "gemini-flash-latest";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

// recebe o prompt criado como argumento e faz uma requisição a API do Gemini, retornando o resultado da simulação
const callGeminiAPI = async (prompt: string) => {
  // isso é o que a API do GEMINI espera ao ser realizada uma requisição
  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return (await response.json()) as GeminiResponse;
};

export const getInsight = async (prompt: string) => {
  // aguarda a resposta da função que faz a requisição à API do Gemini
  const response = await callGeminiAPI(prompt);
  // quando receber a resposta, vai buscar o elemnto no array que interessa: o texto contido na primeira posição do array "parts[]"
  const json = response.candidates[0].content.parts[0].text;
  // um texto será retornado. Ele precisa ser transformado em objeto com o "JSON.parse"
  return JSON.parse(json) as InsightData;
};
