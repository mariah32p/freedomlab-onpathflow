# OnPathFlow MVP Production Checklist

## 🎯 MVP Goal
Get a working coaching platform with basic payments live ASAP with core functionality only.

## ✅ Core Features (Must Have)
1. **User Authentication**
   - Sign up with email/password
   - Sign in/sign out
   - Basic password reset

2. **Simple Stripe Integration**
   - Two plans: Standard ($29) & Premium ($49)
   - 7-day free trial
   - Basic subscription management
   - Cancel/reactivate via Stripe portal

3. **Client Management**
   - Add clients (name, email, goal)
   - View client list
   - Basic client profile page

4. **Goal Tracking**
   - Create simple milestones for clients
   - Mark milestones complete/incomplete
   - Show basic progress percentage

5. **Simple Dashboard**
   - Client count
   - Basic stats
   - Recent activity

## 🚫 Cut for MVP (Add Later)
- **Email Systems** (automated emails like trial reminders, milestone notifications, welcome sequences)
- Advanced analytics & reporting
- File uploads & attachments
- Complex milestone dependencies
- Team features & collaboration
- Mobile app
- Advanced permissions & roles
- Third-party integrations (Calendly, Zoom, etc.)
- Custom branding
- Bulk operations
- Export features

## 🛠 Technical MVP Stack
- **Frontend**: React + TypeScript + Tailwind
- **Backend**: Supabase (auth + database)
- **Payments**: Stripe (simplified - just subscriptions)
- **Deployment**: Netlify

## 📋 MVP Database Schema (Simplified)
```sql
-- Profiles table (extends Supabase Auth)
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  plan text DEFAULT 'standard',
  subscription_status text DEFAULT 'not_started',
  trial_ends_at timestamptz,
  customer_id text,
  subscription_id text,
  created_at timestamptz DEFAULT now()
);

-- Clients table
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  goal text,
  created_at timestamptz DEFAULT now()
);

-- Milestones table
CREATE TABLE milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  completed boolean DEFAULT false,
  due_date date,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);
```

## 🚀 MVP Launch Checklist

### Phase 1: Core Functionality (Week 1)
- [ ] Fix all existing bugs (input styling, navigation, etc.)
- [ ] Simplify Stripe integration (remove complex webhook logic)
- [ ] Create basic client CRUD operations
- [ ] Build simple milestone system
- [ ] Test subscription flow end-to-end

### Phase 2: Polish & Deploy (Week 2)
- [ ] Fix all UI bugs and inconsistencies
- [ ] Ensure responsive design works
- [ ] Add proper loading states
- [ ] Implement error handling
- [ ] Test Stripe webhooks thoroughly
- [ ] Deploy to Netlify with environment variables

### Phase 3: Launch (Week 3)
- [ ] Polish landing page
- [ ] Set up custom domain
- [ ] Add basic analytics (Google Analytics)
- [ ] Create simple onboarding flow
- [ ] Launch to first 10 beta users
- [ ] Collect feedback and iterate

## 💰 Simplified Stripe Flow
1. User signs up → goes to plan selection
2. Selects plan → Stripe checkout with 7-day trial
3. Trial period → full access to features
4. Trial ends → auto-charge or cancel
5. Settings page → Stripe portal for plan changes

## 📊 Success Metrics for MVP
- 10 coaches complete signup + payment
- 50 clients added to platform
- 200 milestones created
- 80%+ trial-to-paid conversion
- Users actively using for 2+ weeks

## 🔄 Post-MVP Roadmap (Priority Order)
1. **Email notifications** (trial ending, milestone reminders)
2. **Advanced analytics** (client progress charts, completion rates)
3. **Mobile responsiveness** improvements
4. **File attachments** for milestones
5. **Team features** (multiple coaches per account)
6. **Integrations** (Calendly, Zoom, Slack)

## 🎯 Key Principles
- **Ship fast, learn fast, iterate fast**
- **Perfect is the enemy of good**
- **Validate demand before building complex features**
- **Focus on core value: helping coaches track client progress**

---

**Current Status**: We have most of the foundation built, just need to simplify and polish for launch.