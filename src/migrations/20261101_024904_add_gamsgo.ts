import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`gamsgo_products_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gamsgo_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`gamsgo_products_features_order_idx\` ON \`gamsgo_products_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`gamsgo_products_features_parent_id_idx\` ON \`gamsgo_products_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`gamsgo_products_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gamsgo_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`gamsgo_products_faq_order_idx\` ON \`gamsgo_products_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`gamsgo_products_faq_parent_id_idx\` ON \`gamsgo_products_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`gamsgo_products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`featured\` integer DEFAULT false,
  	\`monthly_price\` numeric,
  	\`price_note\` text,
  	\`summary\` text NOT NULL,
  	\`logo\` text,
  	\`service_id\` integer,
  	\`affiliate_link_id\` integer NOT NULL,
  	\`verified_at\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`affiliate_link_id\`) REFERENCES \`affiliate_links\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`gamsgo_products_slug_idx\` ON \`gamsgo_products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`gamsgo_products_category_idx\` ON \`gamsgo_products\` (\`category\`);`)
  await db.run(sql`CREATE INDEX \`gamsgo_products_featured_idx\` ON \`gamsgo_products\` (\`featured\`);`)
  await db.run(sql`CREATE INDEX \`gamsgo_products_service_idx\` ON \`gamsgo_products\` (\`service_id\`);`)
  await db.run(sql`CREATE INDEX \`gamsgo_products_affiliate_link_idx\` ON \`gamsgo_products\` (\`affiliate_link_id\`);`)
  await db.run(sql`CREATE INDEX \`gamsgo_products_updated_at_idx\` ON \`gamsgo_products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gamsgo_products_created_at_idx\` ON \`gamsgo_products\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`gamsgo_products_id\` integer REFERENCES gamsgo_products(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_gamsgo_products_id_idx\` ON \`payload_locked_documents_rels\` (\`gamsgo_products_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`gamsgo_products_features\`;`)
  await db.run(sql`DROP TABLE \`gamsgo_products_faq\`;`)
  await db.run(sql`DROP TABLE \`gamsgo_products\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`pages_id\` integer,
  	\`categories_id\` integer,
  	\`media_id\` integer,
  	\`services_id\` integer,
  	\`plans_id\` integer,
  	\`deals_id\` integer,
  	\`affiliate_links_id\` integer,
  	\`affiliate_clicks_id\` integer,
  	\`inquiries_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`plans_id\`) REFERENCES \`plans\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`deals_id\`) REFERENCES \`deals\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`affiliate_links_id\`) REFERENCES \`affiliate_links\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`affiliate_clicks_id\`) REFERENCES \`affiliate_clicks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`inquiries_id\`) REFERENCES \`inquiries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "posts_id", "pages_id", "categories_id", "media_id", "services_id", "plans_id", "deals_id", "affiliate_links_id", "affiliate_clicks_id", "inquiries_id", "users_id") SELECT "id", "order", "parent_id", "path", "posts_id", "pages_id", "categories_id", "media_id", "services_id", "plans_id", "deals_id", "affiliate_links_id", "affiliate_clicks_id", "inquiries_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_plans_id_idx\` ON \`payload_locked_documents_rels\` (\`plans_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_deals_id_idx\` ON \`payload_locked_documents_rels\` (\`deals_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_affiliate_links_id_idx\` ON \`payload_locked_documents_rels\` (\`affiliate_links_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_affiliate_clicks_id_idx\` ON \`payload_locked_documents_rels\` (\`affiliate_clicks_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_inquiries_id_idx\` ON \`payload_locked_documents_rels\` (\`inquiries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
}
