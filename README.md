# 💼 AI Job Agent

**A Full-Stack AI Application designed to optimize job applications for the European Tech Market.**

Built with **Java Spring Boot** and **React**, this tool leverages **Google Gemini Pro (Vertex AI)** to analyze CVs (PDF) against specific job descriptions, providing actionable feedback to increase interview chances.

![AI Job Agent Screenshot](./screenshot01.png)


![AI Job Agent Screenshot](./screenshot02.png)


## 🚀 Features

* **📄 PDF Parsing Engine:** Securely extracts text from PDF resumes using Apache PDFBox (Server-side processing).
* **🧠 Generative AI Analysis:** Orchestrates prompts to Google Vertex AI to identify skill gaps and strong points.
* **🌍 Internationalization (i18n):** Native support for **English** and **Spanish**, catering to the Barcelona/European market.
* **⚡ Modern UI/UX:** Built with React and Material-UI (MUI) for a responsive and accessible experience.
* **🛡️ Robust Architecture:** Decoupled Frontend and Backend following clean architecture principles (Service Layer pattern).

## 🛠️ Tech Stack

### Backend (The Engine)
* **Language:** Java 17
* **Framework:** Spring Boot 3.3
* **AI Integration:** Spring AI + Google Vertex AI (Gemini)
* **Document Processing:** Apache PDFBox
* **Build Tool:** Maven

### Frontend (The Experience)
* **Library:** React (Vite)
* **UI Components:** Material-UI (Custom Themed)
* **i18n:** i18next
* **HTTP Client:** Fetch API with FormData handling

---

## 🏃‍♂️ How to Run Locally

### Prerequisites
* Java 17+ installed
* Node.js & npm installed
* Google Cloud Project with **Vertex AI API** enabled
* Google Cloud CLI (`gcloud`) authenticated

### 1. Clone the Repository
```bash
git clone [https://github.com/SEU_USUARIO/ai-job-agent.git](https://github.com/SEU_USUARIO/ai-job-agent.git)
cd ai-job-agent