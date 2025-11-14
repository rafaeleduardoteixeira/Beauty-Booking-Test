# Beauty Booking Test

It's test to arionkoder.com. I need to build a modern beauty salon booking application built with Next.js 15, TypeScript, and Tailwind CSS.

### Features
- 🎨 Beautiful UI with Tailwind CSS
- 📅 Service booking system
- 🗄️ **JSON Server** for mock database
- ⚡ Next.js 14 with App Router
- 🔷 TypeScript for type safety
- ✨ ESLint + Prettier for code quality
- 🔧 VS Code integration with format on save

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

Start both Next.js and JSON Server:

```bash
npm run dev:all
```

Or run them separately:

```bash
# Terminal 1 - Next.js (port 3000)
npm run dev

# Terminal 2 - JSON Server (port 3001)
npm run server
```

### About IA 
I've been using IA as a tool of developement for almost 2 years, since of Cursor beggining. 
I used Windsurf AI to create this project. I asked to create a project using the latest version of Next.js, TypeScript, and Tailwind CSS. I then asked to make some changes to the project, and Windsurf AI helped me to make those changes, like DB.json, Eslint, Prettier, and some other files. 
The pages structure I create manually, and I asked to AI to help me to create some components, like Header, Toast. After that, I entered in each one and refining the code.

### Structure
The DB structure includes:
- **Companies**: White label configurations (primaryColor, secondaryColor, tertiaryColor, logo) and company details;
- **Users**: Customers who can book services from any company in the system;
- **Professionals**: Employees linked to companies who perform services;
- **Services**: Services offered by each company;
- **ProfessionalServices**: Junction table linking professionals to the services they can perform (many-to-many);
- **ProfessionalAvailability**: Time slots defining when each professional is available to work;
- **Bookings**: Appointments linking users, companies, services, and professionals;
- **WorkingHours**: Operating hours for each company by day of week;
- **Promotions**: Promotions and discounts for services;

### Architecture
About architecture of frontend, it's based on Atomic Design principles combined with Feature-Based Architecture and Clean Code practices. To pass company configuration I used a provider inside each company page, it's a simple way to pass company configuration to all components.

### Design
On home screen I create a good user experience, with a beautiful UI and a good navigation experience. I allow user to search for services, and see promotions and services available.

### Time 
I took more than 10 hours to create this project.