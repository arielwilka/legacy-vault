import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dohmgkugj",
  api_key: "459931338827439",
  api_secret: "GQjHxb200WJU8Bn2iMUw6Y2NoFg",
});

const DESIGNS_DIR =
  "C:\\Users\\ariel\\Documents\\Project Web\\Legacy Vault\\Designs Mock Up-20260526T144350Z-3-001\\Designs Mock Up";

async function uploadAll() {
  const files = fs.readdirSync(DESIGNS_DIR).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));
  console.log(`Found ${files.length} images to upload.\n`);

  const results = [];
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(DESIGNS_DIR, file);
    const publicId = "products/" + path.basename(file, path.extname(file)).replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]/g, "");

    try {
      // Check if already exists
      try {
        await cloudinary.api.resource(publicId);
        console.log(`[SKIP] ${file} — already exists`);
        skipped++;
        results.push({ file, publicId, status: "skipped" });
        continue;
      } catch {
        // Not found, proceed to upload
      }

      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: false,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      });

      uploaded++;
      console.log(`[${uploaded}/${files.length}] ✅ ${file} → ${result.secure_url}`);
      results.push({ file, publicId, url: result.secure_url, status: "uploaded" });
    } catch (err) {
      failed++;
      console.error(`[FAIL] ${file} — ${err.message}`);
      results.push({ file, publicId, status: "failed", error: err.message });
    }
  }

  console.log(`\n========== UPLOAD COMPLETE ==========`);
  console.log(`Uploaded: ${uploaded}`);
  console.log(`Skipped:  ${skipped}`);
  console.log(`Failed:   ${failed}`);
  console.log(`Total:    ${files.length}`);

  // Save results
  const outputPath = path.join(process.cwd(), "scripts", "upload-results.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${outputPath}`);
}

uploadAll().catch(console.error);
