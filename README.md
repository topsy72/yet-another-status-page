# Yet Another Status Page

A modern, self-hosted status page built with [Payload CMS](https://payloadcms.com/) and [Next.js](https://nextjs.org/).

[![Docker Build](https://github.com/Hostzero-GmbH/yet-another-status-page/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/Hostzero-GmbH/yet-another-status-page/actions/workflows/docker-publish.yml)
[![Documentation](https://github.com/Hostzero-GmbH/yet-another-status-page/actions/workflows/docs.yml/badge.svg)](https://hostzero-gmbh.github.io/yet-another-status-page)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHostzero-GmbH%2Fyet-another-status-page&env=PAYLOAD_SECRET&envDescription=Required%20environment%20variables%20for%20Yet%20Another%20Status%20Page&envLink=https%3A%2F%2Fhostzero-gmbh.github.io%2Fyet-another-status-page%2Fgetting-started%2Fconfiguration.html&project-name=yet-another-status-page&repository-name=yet-another-status-page&stores=%5B%7B%22type%22%3A%22postgres%22%7D%2C%7B%22type%22%3A%22blob%22%7D%5D)

> **Note**: After deploying to Vercel, make sure to add a **Vercel Blob** store in your project's Storage settings for media uploads to work.

## Features

- **Incident Management** — Track and communicate service disruptions with timeline updates
- **Scheduled Maintenance** — Plan and notify users about upcoming maintenance windows
- **Email & SMS Notifications** — Automatic subscriber notifications via SMTP and Twilio
- **Service Groups** — Organize services into logical groups
- **Beautiful UI** — Modern, responsive status page with dark mode support
- **Self-Hosted** — Full control over your data and infrastructure
- **Docker Ready** — Easy deployment with Docker and Docker Compose
- **🎯 Live Demo Mode** — Interactive demo environment with automatic resets (see below)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Hostzero-GmbH/yet-another-status-page.git
cd yet-another-status-page

# Start the services
docker compose up -d
```

Visit:

- **Status Page**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

## 🎯 Live Demo Mode

This fork includes a **Live Demo Mode** feature that allows users to interact with the admin panel without registration. Perfect for showcasing the platform or providing a sandbox environment.

### Quick Demo Setup

```bash
# Clone this fork
git clone https://github.com/topsy72/yet-another-status-page.git
cd yet-another-status-page

# Start demo environment with automatic resets
docker-compose -f docker-compose.demo.yml up -d
```

Visit:
- **Demo Status Page**: http://localhost:3000
- **Demo Admin Panel**: http://localhost:3000/admin/login (auto-filled credentials)

### Demo Features

- ✅ **Auto-filled Login** — Credentials pre-populated on login page
- ✅ **Demo Banner** — Clear indicator with countdown to next reset
- ✅ **Automatic Resets** — Database resets hourly (configurable)
- ✅ **Sample Data** — Pre-populated with realistic incidents, services, and maintenance
- ✅ **Password Protection** — Demo user password cannot be changed
- ✅ **Login Button** — Public page includes "Login" button in demo mode

### Configuration

Enable demo mode by setting environment variables:

```bash
DEMO_MODE=true
DEMO_USER_EMAIL=demo@yasp.io
DEMO_USER_PASSWORD=demo123
DEMO_RESET_INTERVAL_MINUTES=60  # Reset every 60 minutes
```

### Deployment Options

#### Docker (Recommended)
```bash
# Start demo environment with scheduler
docker-compose -f docker-compose.demo.yml up -d

# View logs
docker-compose -f docker-compose.demo.yml logs -f

# Stop demo environment
docker-compose -f docker-compose.demo.yml down
```

**What's included:**
- Main application server
- PostgreSQL database with health checks
- Demo reset scheduler (separate service)
- Automatic restarts on failure
- Persistent volumes for uploads

#### Local Development
```bash
# Install dependencies
npm install

# Configure environment (.env file)
DEMO_MODE=true
DEMO_USER_EMAIL=demo@yasp.io
DEMO_USER_PASSWORD=demo123
DEMO_RESET_INTERVAL_MINUTES=60

# Seed demo data
npm run demo:seed

# Start development server
npm run dev

# (Optional) Run scheduler in separate terminal
npm run demo:scheduler
```

#### Production Deployment

**Cloud Platforms (Vercel, Railway, Heroku):**
1. Deploy main application as usual
2. Set environment variables in platform dashboard
3. Run `npm run demo:seed` via platform CLI
4. Set up scheduler as a separate worker/service

**For detailed production deployment options, see [Demo Mode Documentation](docs/DEMO_MODE.md#production-deployment)**

### Documentation

📚 **[Full Demo Mode Documentation](docs/DEMO_MODE.md)** — Comprehensive setup guide, deployment options, troubleshooting, and architecture details

## Documentation

📚 **[Full Documentation](https://hostzero-gmbh.github.io/yet-another-status-page)**

- [Installation Guide](https://hostzero-gmbh.github.io/yet-another-status-page/getting-started/installation/)
- [Configuration](https://hostzero-gmbh.github.io/yet-another-status-page/getting-started/configuration/)
- [Admin Guide](https://hostzero-gmbh.github.io/yet-another-status-page/admin/overview/)
- [API Reference](https://hostzero-gmbh.github.io/yet-another-status-page/api/rest/)
- [Local Development](https://hostzero-gmbh.github.io/yet-another-status-page/development/local-setup/)

## Tech Stack

| Component | Technology                                     |
| --------- | ---------------------------------------------- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| CMS       | [Payload CMS 3.x](https://payloadcms.com/)     |
| Database  | PostgreSQL                                     |
| Styling   | Tailwind CSS                                   |
| Email     | Nodemailer (SMTP)                              |
| SMS       | Twilio                                         |

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on development setup, coding standards, and the pull request process.

## Security

For security concerns, please review our [Security Policy](SECURITY.md). Do not report security vulnerabilities through public GitHub issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
