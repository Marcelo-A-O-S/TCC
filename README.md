# 🔧 TCC – Rede Social para o Universo da Mecânica

# Apresentação

https://github.com/user-attachments/assets/783d20f8-0b5e-4266-9d11-fa2388b14c3c

## 📌 Sobre o Projeto
O **TCC** é uma rede social criada para **solucionar dúvidas sobre peças** e outros tópicos relacionados ao universo da **mecânica**, voltada tanto para **leigos** quanto para **profissionais** que lidam com o tema no dia a dia.  

### ✨ Funcionalidades Principais
- 🔔 **Notificações em tempo real**.  
- 📝 **Atualizações de postagens instantâneas** (via SignalR).  
- 👤 **Criação e personalização de perfil de usuário**.  
- 🔐 **Autenticação com JWT**.  
- 📱 **Interface moderna e responsiva**.  

---

## ⚙️ Tecnologias Utilizadas

### 🔙 Back-end
- **Plataforma:** [.NET 6](https://dotnet.microsoft.com/)  
- **Banco de Dados:** MySQL  
- **ORM:** Entity Framework Core  
- **Comunicação em tempo real:** SignalR  
- **Documentação de API:** Swagger  

#### 📦 Dependências principais
- **Microsoft.AspNetCore.Authentication.JwtBearer** – Implementa autenticação via JWT (JSON Web Tokens).  
- **Microsoft.AspNetCore.SignalR** – Permite comunicação em tempo real entre servidor e clientes.  
- **Microsoft.AspNetCore.SignalR.Client** – Cliente para conectar aplicações externas ao SignalR.  
- **Microsoft.AspNetCore.SignalR.Client.Core** – Núcleo do cliente SignalR para integração avançada.  
- **Microsoft.EntityFrameworkCore** – ORM que facilita a manipulação de dados no banco MySQL.  
- **Microsoft.EntityFrameworkCore.Design** – Ferramentas de design e scaffolding para EF Core.  
- **Microsoft.EntityFrameworkCore.Tools** – Ferramentas de linha de comando para migrations e gerenciamento de banco.  
- **Pomelo.EntityFrameworkCore.MySql** – Provedor MySQL para EF Core.  
- **Swashbuckle.AspNetCore** – Gera documentação Swagger para APIs ASP.NET Core.  
- **Swashbuckle.AspNetCore.Filters** – Adiciona filtros e exemplos avançados para documentação Swagger.  

---

### 🎨 Front-end
- **Framework:** [Next.js 14](https://nextjs.org/)  
- **Linguagem:** TypeScript  
- **UI & Componentes:** React, Swiper, React Multi Carousel  
- **Autenticação:** Next-Auth + Cookies  
- **Gerenciamento de dados:** SWR + Axios  

#### 📦 Dependências principais
- **@microsoft/signalr** – Comunicação em tempo real com o back-end via SignalR.  
- **axios** – Cliente HTTP para chamadas à API.  
- **js-cookie / nookies** – Gerenciamento de cookies para autenticação e preferências.  
- **next-auth** – Gerenciamento de autenticação e sessão de usuários.  
- **react / react-dom** – Base do front-end e renderização de componentes.  
- **react-multi-carousel / swiper** – Componentes de carrossel e sliders para UI.  
- **swr** – Fetching de dados eficiente e reatividade.  
- **uuid** – Geração de IDs únicos para elementos e entidades.  

### 🗄️ Arquitetura do Projeto
O sistema segue arquitetura **cliente-servidor**, separando responsabilidades:

- **Back-end:**  
  - Gerencia autenticação, lógica de negócios, notificações e persistência de dados.  
  - Expõe APIs REST e hubs SignalR para comunicação em tempo real.  

- **Front-end:**  
  - Renderiza interface responsiva e consome APIs do back-end.  
  - Atualizações em tempo real de postagens e notificações via SignalR.  

- **Banco de Dados:**  
  - MySQL relacional para armazenar usuários, postagens, interações e notificações.  
  - Integração com EF Core para queries e migrations.  





