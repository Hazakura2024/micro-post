# システム構成図

## 1.技術スタック

- **Frontend**: React, TypeScript, react-router-dom, axios, styled-components, react-toastify
- **Backend**: NestJS(Node.js), TypeORM
- **Database**: PostgreSQL
- **Development/Quantity**: ESLint, Prettier, Jest

## 2.構成図

```mermaid

graph TD;
    A[Browser] --> B[React App];
    B --> B1[Routing: react-router-dom];
    B --> B2[HTTP Client: axios];
    B --> B3[UI Style: styled-components];
    B --> B4[Notification: react-toastify];
    B --> C[NestJS / Backend];
    C --> D[PostgreSQL];
```
