# 🚀 Guia de Implementação - Estilos React

## Como aplicar os novos estilos aos componentes React

### 1. Header Component

```tsx
import styles from "../styles/header.module.css";
// ou
import styles from "../sass/header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Nexus Obra</h1>
      <img src="/logo.png" alt="Logo" className={styles.logo} />
    </div>
  );
};
```

### 2. Navbar Component

```tsx
import styles from "../sass/navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>NexusObra</div>
      <ul className={styles.navLinks}>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/clients">Clientes</a>
        </li>
        <li>
          <a href="/projects">Projetos</a>
        </li>
      </ul>
      <div className={styles.actions}>
        <button>Logout</button>
      </div>
    </nav>
  );
};
```

### 3. ClientList Component

```tsx
import styles from "../sass/clientlist.module.scss";

const ClientList = ({ clients }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Lista de Clientes</h2>
        <button>+ Novo Cliente</button>
      </div>

      {clients.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhum cliente cadastrado</p>
          <button>Criar Cliente</button>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td className={styles.actions}>
                  <button className={styles.editBtn}>Editar</button>
                  <button className={styles.deleteBtn}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
```

### 4. CreateClient Component

```tsx
import styles from "../sass/createclient.module.scss";
import { useState } from "react";

const CreateClient = ({ onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.createClientWrapper}>
      <div className={styles.header}>
        <h2>Novo Cliente</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              placeholder="Nome completo"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="email@example.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            placeholder="Informações adicionais..."
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn}>
            Cancelar
          </button>
          <button type="submit" className={styles.submitBtn}>
            Criar Cliente
          </button>
        </div>
      </form>
    </div>
  );
};
```

### 5. Login Component

```tsx
import styles from "../sass/loginpage.module.scss";
import { useState } from "react";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({});

  return (
    <div className={styles.container}>
      <div className={styles.loginpage}>
        <h1>Bem-vindo ao NexusObra</h1>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="seu@email.com" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" placeholder="••••••••" />
          </div>

          <button className={styles.button}>Entrar</button>

          <div className={styles.link}>
            Não tem conta? <a href="/register">Registrar</a>
          </div>
        </form>
      </div>
    </div>
  );
};
```

### 6. Dashboard Component

```tsx
import styles from "../sass/dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>NexusObra</div>
        <ul className={styles.menu}>
          <li className={`${styles.menuItem} ${styles.active}`}>
            📊 Dashboard
          </li>
          <li className={styles.menuItem}>👥 Clientes</li>
          <li className={styles.menuItem}>📁 Projetos</li>
          <li className={styles.menuItem}>📊 Relatórios</li>
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.topbar}>
          <h1>Dashboard</h1>
          <div className={styles.actions}>
            <span className={styles.upgradeBadge}>Upgrade</span>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Clientes Ativos</h3>
              <span className={styles.icon}>👥</span>
            </div>
            <div className={styles.kpiValue}>24</div>
            <div className={styles.kpiLabel}>Total de clientes</div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Projetos</h3>
              <span className={styles.icon}>📁</span>
            </div>
            <div className={styles.kpiValue}>8</div>
            <div className={styles.kpiLabel}>Projetos em andamento</div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Receita</h3>
              <span className={styles.icon}>💰</span>
            </div>
            <div className={styles.kpiValue}>R$ 45k</div>
            <div className={styles.kpiLabel}>Este mês</div>
          </div>
        </div>
      </main>
    </div>
  );
};
```

## 📋 Melhores Práticas

### ✅ Use Classes CSS Modules

```tsx
// ✅ Correto
<button className={styles.buttonPrimary}>Clique aqui</button>

// ❌ Evitar
<button className="button-primary">Clique aqui</button>
```

### ✅ Use Mixins para Reutilização

```scss
// Em um novo componente
@use "../sass/variables" as *;
@use "../sass/mixins" as *;

.myButton {
  @include button-primary;
}

.myCard {
  @include card;
}
```

### ✅ Propriedades Variáveis

```scss
.myElement {
  color: $primary-500;
  padding: $space-lg;
  border-radius: $radius-lg;
  box-shadow: $shadow-md;
  transition: all $transition-base;
}
```

## 🔄 Componentes Prontos para Usar

| Componente  | Ficheiro                 | Notas               |
| ----------- | ------------------------ | ------------------- |
| Header      | header.module.scss       | Logo + título       |
| Navbar      | navbar.module.scss       | Navegação com links |
| Footer      | footer.module.scss       | Footer dark         |
| Dashboard   | dashboard.module.scss    | Sidebar + cards     |
| TablesTable | table.module.scss        | Tabelas completas   |
| LoginForm   | loginpage.module.scss    | Formulário login    |
| ClientForm  | createclient.module.scss | Formulário cliente  |

## 🐛 Troubleshooting

### SCSS não está aplicando

```text
1. Verifique se a extensão é .module.scss
2. Confirme que está importando os styles corretamente
3. Execute: npm run build
```

### Cores não combinam

```text
1. Use sempre variáveis: $primary-500, $gray-800, etc.
2. Não use hex colors hard-coded
3. Consulte _variables.scss para a lista completa
```

### Layout desalinhado

```text
1. Use flex-center, flex-between para layouts
2. Use space-lg para spacing consistente
3. Verifique se está usando card ou card-elevated
```

## 📚 Recursos

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Guia completo do design system
- [CHANGELOG_STYLING.md](./CHANGELOG_STYLING.md) - Histórico de mudanças
- `src/sass/_variables.scss` - Todas as variáveis disponíveis
- `src/sass/_mixins.scss` - Todos os mixins disponíveis

---

**Última atualização**: Janeiro 2026
