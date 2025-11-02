# AGI17 Voice Agent — QualiFy Real Estate Lead Automation

> **Work Report Note:** All commits performed by Lead (Joscha); team contributions integrated manually via main branch.

**Status:** [![Supabase CI](https://github.com/bacchusvino/agi17-voice-agent/actions/workflows/supabase-ci.yml/badge.svg?branch=main)](https://github.com/bacchusvino/agi17-voice-agent/actions/workflows/supabase-ci.yml)

A modern voice-enabled lead automation platform for San Diego real estate agents, built with Supabase and featuring AI-powered voice capture capabilities.

## 🚀 Features

- **Voice Agent Integration**: AI-powered voice capture for lead qualification
- **Real-time Lead Management**: Supabase-powered database with RLS security
- **Modern UI/UX**: Responsive design with smooth animations
- **Automated CI/CD**: GitHub Actions for seamless deployment
- **Form Validation**: Client-side and server-side validation
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Voice**: Web Speech API
- **Deployment**: GitHub Actions + Supabase
- **Testing**: Custom test suite

## 📋 Prerequisites

- Node.js 18+ 
- Supabase CLI
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/agi17-voice-agent.git
cd agi17-voice-agent
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

#### Option A: Local Development
```bash
# Start Supabase locally
npm run supabase:start

# Check status
npm run supabase:status
```

#### Option B: Production Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy `config.example.js` to `config.js`
3. Update with your Supabase credentials:
   ```javascript
   export const config = {
     supabase: {
       url: 'https://your-project-ref.supabase.co',
       anonKey: 'your-anon-key'
     }
   };
   ```

### 4. Run the Application
```bash
# Development server
npm run dev

# Or simple HTTP server
npm run serve
```

### 5. Run Tests
```bash
npm test
```

## 🗄️ Database Schema

The application uses the following Supabase tables:

### `leads` Table
- `id` (bigserial, primary key)
- `name` (text, required)
- `email` (text, required)
- `phone` (text, optional)
- `source` (text, default: 'landing_page')
- `status` (text, default: 'new')
- `notes` (text, optional)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### Security
- Row Level Security (RLS) enabled
- Public insert policy for lead capture
- Authenticated read policy for admin access

## 🎤 Voice Agent Features

The voice agent provides:

- **Speech Recognition**: Captures user voice input
- **Data Extraction**: Automatically extracts email, phone, and notes
- **Form Population**: Pre-fills form fields with extracted data
- **Error Handling**: Graceful fallback for unsupported browsers

### Browser Support
- Chrome/Chromium: Full support
- Firefox: Limited support
- Safari: Limited support
- Edge: Full support

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🚀 Deployment

### GitHub Actions CI/CD
The project includes automated deployment via GitHub Actions:

1. **Push to main**: Automatically runs migrations
2. **Pull Requests**: Validates database schema
3. **Secrets Required**:
   - `SUPABASE_ACCESS_TOKEN`
   - `SUPABASE_PROJECT_REF`
   - `SUPABASE_DB_PASSWORD`

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy to your hosting platform
# (Vercel, Netlify, etc.)
```

## 📁 Project Structure

```
agi17-voice-agent/
├── index.html              # Main application
├── js/
│   └── supabase.js         # Supabase integration & voice agent
├── supabase/
│   ├── config.toml         # Supabase configuration
│   └── migrations/
│       └── 20250927_init.sql
├── tests/
│   └── basic.test.js       # Test suite
├── package.json            # Dependencies & scripts
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file (copy from `.env.example`):
```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
VOICE_AGENT_ENABLED=true
```

### Supabase Configuration
Update `supabase/config.toml` for local development settings.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@qualify.com or create an issue in this repository.

---

**Built with ❤️ for San Diego Real Estate Agents**
