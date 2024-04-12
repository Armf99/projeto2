# Use uma imagem base mais leve, como o Alpine
FROM node:alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie apenas o arquivo package.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install --production

# Copie apenas os arquivos necessários para o diretório de trabalho no contêiner
COPY . .

# Expõe a porta 3000 para o ambiente externo, onde a aplicação será executada
EXPOSE 3000

# Comando para iniciar o servidor quando o contêiner for iniciado
CMD ["npm", "start"]
