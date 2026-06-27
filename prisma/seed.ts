/**
 * Seed script — creates a SUPER_ADMIN account and sample (clearly-marked)
 * blog posts so the site isn't empty on first deploy.
 *
 * Run with: npm run db:seed
 *
 * IMPORTANT: Change the seeded admin password immediately after first
 * login in production. See docs/DEPLOYMENT.md → "First-time setup".
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@prakhargreenenergy.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: adminEmail,
        phone: "9999999999",
        passwordHash,
        role: "SUPER_ADMIN",
      },
    });
    console.log(`✅ Created SUPER_ADMIN: ${adminEmail}`);
    console.log(`   Password: ${adminPassword} — CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN.`);
  } else {
    console.log(`ℹ️  Admin ${adminEmail} already exists — skipping.`);
  }

  const samplePostSlug = "how-to-clean-solar-panels";
  const existingPost = await prisma.blogPost.findUnique({ where: { slug: samplePostSlug } });

  if (!existingPost) {
    await prisma.blogPost.create({
      data: {
        slug: samplePostSlug,
        title: "How to Clean Solar Panels? A Guide on Rooftop Solar Panel Cleaning",
        excerpt:
          "Dust and grime can reduce solar panel output by up to 25%. Here's how to clean yours safely.",
        content: `<p>Regular cleaning is one of the simplest ways to maintain your rooftop solar system's output. Dust, pollen, and bird droppings can reduce generation efficiency, especially during India's dry summer months.</p><p><strong>Editor's note:</strong> Replace this sample content with your own published article via the admin panel before going live.</p>`,
        authorName: "Prakhar Editorial",
        published: true,
        publishedAt: new Date(),
      },
    });
    console.log(`✅ Created sample blog post: ${samplePostSlug}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
