"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding...');
    const passwordHash = await bcrypt.hash('Admin@12345', 10);
    const superAdmin = await prisma.user.upsert({
        where: { email: 'superadmin@sports.local' },
        update: {},
        create: {
            email: 'superadmin@sports.local',
            passwordHash,
            role: client_1.UserRole.SUPER_ADMIN,
            emailVerified: true,
            displayName: 'Super Admin',
            countryCode: 'UG',
        },
    });
    const territories = [
        { code: 'UG', name: 'Uganda', region: 'Africa' },
        { code: 'KE', name: 'Kenya', region: 'Africa' },
        { code: 'RW', name: 'Rwanda', region: 'Africa' },
        { code: 'TZ', name: 'Tanzania', region: 'Africa' },
        { code: 'NG', name: 'Nigeria', region: 'Africa' },
        { code: 'GB', name: 'United Kingdom', region: 'Europe' },
        { code: 'US', name: 'United States', region: 'North America' },
        { code: 'WW', name: 'Worldwide', region: 'Global' },
    ];
    for (const t of territories) {
        await prisma.territory.upsert({ where: { code: t.code }, update: {}, create: t });
    }
    const sports = [
        { slug: 'football', name: 'Football', category: 'Team', isTeamBased: true, scoringType: 'GOALS' },
        { slug: 'basketball', name: 'Basketball', category: 'Team', isTeamBased: true, scoringType: 'POINTS' },
        { slug: 'tennis', name: 'Tennis', category: 'Racket', isTeamBased: false, scoringType: 'SETS' },
        { slug: 'cricket', name: 'Cricket', category: 'Team', isTeamBased: true, scoringType: 'RUNS' },
        { slug: 'rugby-union', name: 'Rugby Union', category: 'Team', isTeamBased: true, scoringType: 'POINTS' },
        { slug: 'athletics', name: 'Athletics', category: 'Individual', isTeamBased: false, scoringType: 'TIME' },
        { slug: 'boxing', name: 'Boxing', category: 'Combat', isTeamBased: false, scoringType: 'DECISION' },
        { slug: 'esports', name: 'Esports', category: 'Digital', isTeamBased: true, scoringType: 'CUSTOM' },
        { slug: 'volleyball', name: 'Volleyball', category: 'Team', isTeamBased: true, scoringType: 'SETS' },
        { slug: 'motorsports', name: 'Motorsports', category: 'Racing', isTeamBased: false, scoringType: 'TIME' },
    ];
    for (const s of sports) {
        await prisma.sport.upsert({ where: { slug: s.slug }, update: {}, create: s });
    }
    const fifa = await prisma.organization.upsert({
        where: { slug: 'fifa' },
        update: {},
        create: { slug: 'fifa', name: 'FIFA', type: 'FEDERATION' },
    });
    const football = await prisma.sport.findUnique({ where: { slug: 'football' } });
    if (football) {
        const comp = await prisma.competition.upsert({
            where: { slug: 'premier-league-demo' },
            update: {},
            create: {
                slug: 'premier-league-demo',
                name: 'Demo Premier League',
                sportId: football.id,
                organizationId: fifa.id,
                level: 'NATIONAL',
                countryCode: 'GB',
            },
        });
        const season = await prisma.season.upsert({
            where: { competitionId_slug: { competitionId: comp.id, slug: '2025-26' } },
            update: {},
            create: {
                competitionId: comp.id,
                name: '2025/26',
                slug: '2025-26',
                startDate: new Date('2025-08-01'),
                endDate: new Date('2026-05-31'),
            },
        });
    }
    const plans = [
        { slug: 'free', name: 'Free', description: 'Free highlights only', interval: 'MONTHLY', priceCents: 0, currency: 'USD', features: { highlights: true } },
        { slug: 'all-sports-monthly', name: 'All Sports Monthly', description: 'Access all sports', interval: 'MONTHLY', priceCents: 999, currency: 'USD', features: { live: true, replay: true } },
        { slug: 'all-sports-annual', name: 'All Sports Annual', description: 'All sports yearly save 20%', interval: 'ANNUAL', priceCents: 9999, currency: 'USD', features: { live: true, replay: true } },
        { slug: 'football-pass', name: 'Football Pass', description: 'All football competitions', interval: 'MONTHLY', priceCents: 499, currency: 'USD', features: { sport: 'football' } },
    ];
    for (const p of plans) {
        await prisma.subscriptionPlan.upsert({ where: { slug: p.slug }, update: {}, create: p });
    }
    console.log('Seed done', { superAdmin: superAdmin.email });
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
//# sourceMappingURL=seed_1.js.map