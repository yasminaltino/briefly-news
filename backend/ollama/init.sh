#!/bin/sh

ollama serve &

echo "Aguardando servidor Ollama iniciar..."
sleep 3

echo "Baixando modelo gemma2:2b..."
ollama pull gemma2:2b

wait 
