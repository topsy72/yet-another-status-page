#!/bin/bash

echo "🧪 Testing Demo Mode..."

# Check environment
if ! grep -q "DEMO_MODE=true" .env; then
    echo "❌ DEMO_MODE not enabled in .env"
    exit 1
fi
echo "✅ Demo mode enabled in .env"

# Test database connection
if ! psql -U postgres -h localhost -d hostzero_status -c "SELECT 1;" > /dev/null 2>&1; then
    echo "❌ Database connection failed"
    exit 1
fi
echo "✅ Database connection successful"

# Seed demo data
echo "📦 Seeding demo data..."
npm run demo:seed > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Demo data seeded successfully"
else
    echo "❌ Failed to seed demo data"
    exit 1
fi

echo ""
echo "✅ All checks passed!"
echo ""
echo "Next steps:"
echo "1. Start the app:       npm run dev"
echo "2. Start scheduler:     npm run demo:scheduler"
echo "3. Visit:               http://localhost:3000/admin"
echo "4. Login with:          demo@yasp.io / demo123"
