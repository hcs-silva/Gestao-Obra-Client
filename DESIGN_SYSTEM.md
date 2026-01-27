# Design System - NexusObra

Este documento detalha o design system aplicado à aplicação NexusObra, baseado nos estilos dos templates.

## 🎨 Paleta de Cores

### Cores Primárias

- **Azul Primário**: `#2563EB` - Usado em botões, links e elementos principais
- **Verde Secundário**: `#10B981` - Usado em ações positivas e sucesso
- **Laranja Acentuado**: `#F97316` - Usado em destaques e gradientes

### Cores de Suporte

- **Cinza 50-900**: Escala neutra completa para backgrounds e texto
- **Cores de Status**:
  - Sucesso: `#10B981`
  - Erro: `#EF4444`
  - Aviso: `#F59E0B`
  - Info: `#4FA8D5`

## 🖋 Tipografia

- **Font Principal**: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Tamanhos**:
  - xs: 0.75rem (12px)
  - small: 0.875rem (14px)
  - base: 1rem (16px)
  - lg-4xl: escalas de 1.125rem até 2.25rem

## 📏 Espaçamento

- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

## 🎯 Componentes

### Botões

- **Primary**: Azul com sombra, elevação ao hover
- **Secondary**: Branco com border azul
- **Success**: Verde
- **Danger**: Vermelho
- **Ghost**: Transparente com cor primária

### Cards

- Background branco
- Sombra suave
- Border radius: 12px
- Elevação ao hover

### Inputs

- Border cinza 300
- Focus: border primária com sombra de foco
- Padding consistente

### Alertas

- Background colorido + border esquerdo
- Versões: Success, Error, Warning, Info

### Navegação

- Sidebar dark (900) com items em hover
- Item ativo com background primário
- NavBar branca com sombra

## 📁 Estrutura de Ficheiros

```text
src/
├── sass/
│   ├── _variables.scss      # Variáveis de design (cores, fonts, spacing)
│   ├── _mixins.scss         # Mixins reutilizáveis (flex, botões, cards)
│   ├── _globals.scss        # Estilos globais (resets, typography)
│   ├── header.module.scss
│   ├── footer.module.scss
│   ├── navbar.module.scss
│   ├── clientlist.module.scss
│   ├── createclient.module.scss
│   ├── dashboard.module.scss
│   ├── table.module.scss
│   ├── loginpage.module.scss
│   ├── welcome.module.scss
│   ├── passwordupdatepage.module.scss
│   ├── common.module.scss
│   └── main.module.scss
```

## 🔄 Mixins Disponíveis

### Flexbox

- `@include flex-center` - Centra conteúdo
- `@include flex-between` - Space-between
- `@include flex-col` - Flex column

### Tipografia

- `@include heading($size, $weight, $color)` - Estilos de heading

### Componentes

- `@include button-primary` - Botão primário
- `@include button-secondary` - Botão secundário
- `@include button-success` - Botão sucesso
- `@include button-danger` - Botão perigo
- `@include card` - Card com hover
- `@include card-elevated` - Card com sombra maior
- `@include nav-item` - Item de navegação
- `@include input-base` - Input padrão
- `@include alert-success` - Alerta de sucesso
- `@include alert-error` - Alerta de erro
- `@include table-base` - Tabela base

## 📱 Responsividade

- Grid layout com `repeat(auto-fit, minmax(300px, 1fr))`
- Mobile-first approach
- Media queries para dispositivos pequenos
- Flex layouts adaptativos

## ✨ Sombras e Transições

- Shadow SM: 0 1px 2px rgba(0, 0, 0, 0.05)
- Shadow MD: 0 2px 10px rgba(0, 0, 0, 0.05)
- Shadow LG: 0 4px 15px rgba(0, 0, 0, 0.1)

- Transition Fast: 0.2s ease-in-out
- Transition Base: 0.3s ease-in-out
- Transition Slow: 0.5s ease-in-out

## 🚀 Como Usar

Para criar um novo componente com estilos consistentes:

1. Importe as variáveis e mixins:

```scss
@use "../sass/variables" as *;
@use "../sass/mixins" as *;
```

2. Use os mixins disponíveis:

```scss
.myButton {
  @include button-primary;
}

.myCard {
  @include card;
}
```

3. Utilize as variáveis:

```scss
.myElement {
  color: $primary-500;
  padding: $space-lg;
  border-radius: $radius-lg;
  box-shadow: $shadow-md;
}
```

## 📝 Notas

- Todos os estilos estão centralizados em `_variables.scss` e `_mixins.scss`
- Os componentes reutilizam os mixins para manter consistência
- As variáveis estão organizadas por categoria (colors, typography, spacing, etc.)
- Os ficheiros de estilo dos componentes usam o padrão CSS Modules

---

**Última atualização**: Janeiro 2026
**Versão**: 1.0
