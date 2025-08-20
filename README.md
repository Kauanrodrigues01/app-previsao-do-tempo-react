<div align="center">
	<h1>App Previsão do Tempo ☀️🌧️</h1>
	</p>
		<!-- <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
		<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=white" alt="CSS3"/> -->
		<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
		<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
		<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
		<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
		<img src="https://img.shields.io/badge/OpenWeatherMap-FFB300?style=for-the-badge&logo=OpenWeatherMap&logoColor=white" alt="OpenWeatherMap"/>
	</p>
</div>

# App Previsão do Tempo ☀️🌧️

Este é um projeto simples em React, feito por mim para colocar em prática conceitos e funcionalidades básicas que foram estudadas até o momento. Ele consulta a previsão do tempo atual e dos próximos 5 dias de qualquer cidade, utilizando a API OpenWeatherMap.

## Demonstração

![Demonstração do app](./public/demostracao-do-app.png)

## Funcionalidades
- Busca por cidade
- Exibe informações do clima atual (temperatura, sensação térmica, umidade, pressão, descrição e ícone)
- Exibe previsão para os próximos 5 dias
- Mensagens de erro amigáveis
- Interface responsiva e acessível

## Tecnologias Utilizadas
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)

## Como rodar o projeto

1. **Clone o repositório:**
	```bash
	https://github.com/Kauanrodrigues01/app-previsao-do-tempo-react.git
	cd app-previsao-do-tempo-react
	```

2. **Instale as dependências:**
	```bash
	npm install
	```

3. **Configure a chave da API:**
	- Crie um arquivo `.env` na raiz do projeto com o conteúdo:
	  ```env
	  VITE_API_KEY=SuaChaveDaAPI
	  ```
	- Você pode obter uma chave gratuita em [OpenWeatherMap](https://openweathermap.org/api).

4. **Inicie o projeto:**
	```bash
	npm run dev
	```
	O app estará disponível em `http://localhost:5173`.

## Estrutura de Pastas
```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ForecastInformations/
│   │   └── WeatherInformations/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── README.md
```
---
