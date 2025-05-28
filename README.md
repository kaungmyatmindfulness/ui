# **Photo Listing App**

**Assessment for React Developer Consultant Position**

**United Nations Office of Information and Communications Technology**

**Location** : Bangkok, Thailand

**Developer Contact** : [kaungmyat.mindfulness@gmail.com](mailto:kaungmyat.mindfulness@gmail.com)

---

## **Architecture & Folder Structure**

The application follows the **Feature-Sliced Design (FSD)** methodology. This structure emphasizes modularity and separation of concerns by organizing the codebase into logical feature units. This promotes scalability, team collaboration, and clear responsibility boundaries between components, services, and logic.

---

## **Technology Stack**

| **Category**       | **Libraries / Tools**                             |
| ------------------ | ------------------------------------------------- |
| Framework          | [Next.js](https://nextjs.org/)(App Router, SSR)   |
| UI & Styling       | [shadcn/ui](https://ui.shadcn.com/), Tailwind CSS |
| Data Fetching      | React Query (TanStack), Next.js fetch()           |
| Forms & Validation | React Hook Form +[Zod](https://zod.dev/)          |
| State Management   | React Query (cache and async state)               |
| Linting/Formatting | ESLint, Prettier                                  |
| Dev Acceleration   | Git, VS Code Copilot (auto-completion only)       |

---

## **Rendering Strategy**

- **Hybrid Rendering** is used:
    - **Server-side components** enhance SEO and initial load performance.
    - **Client-side components** are used where interactivity is essential.
- Built with **Next.js App Router** to leverage:
    - Static Site Generation (SSG)
    - Server-Side Rendering (SSR)
    - Edge-optimized performance

---

## **SEO & Performance**

As this is a photo listing application, **performance and SEO are prioritized** :

- Server-side rendering for metadata and image tags
- Optimized font and image loading via Next.js
- Mobile-first responsive design

---

## **Error Handling Strategy**

| **Scenario**                | **Handling Mechanism**                            |
| --------------------------- | ------------------------------------------------- |
| Network Failure (List View) | React Query retry logic (automatic silent retry)  |
| Photo Load Failure          | Manual retry option for user (graceful fallback)  |
| Form & Others               | Visible error alerts via toast or alert component |

---

## **Data Fetching Strategy**

| **Use Case**            | **Tools Used**                                      |
| ----------------------- | --------------------------------------------------- |
| Initial Page Load (SSR) | fetch() in Next.js server components                |
| Client-Side Updates     | React Query with caching, revalidation, and retries |

The combination of fetch() + React Query ensures performance and SSR-compatibility while enabling advanced client-side cache and stale revalidation.

---

## **Form Handling**

- **Form Library** : react-hook-form
- **Schema Validation** : zod
- Built-in validations for required fields, type checks, and custom formats.
- User-friendly error messages and input validation UI.

---

## **Responsiveness**

- Fully mobile-friendly and responsive.
- Fluid layout, adaptive typography, and spacing across viewports.

---

## **AI Usage Statement**

- **VS Code Copilot** was used strictly for **code auto-completion** and boilerplate generation to reduce development time.
- **No AI or LLM** tools were used for key architectural decisions, UX design, or problem-solving.
- Solutions were derived from LLM, professional experience, documentation, and public sources like Stack Overflow.

---

## **Contact**

For questions, issues, or feedback regarding this assessment, please reach out to:

📧 **[kaungmyat.mindfulness@gmail.com](mailto:kaungmyat.mindfulness@gmail.com)**

---
