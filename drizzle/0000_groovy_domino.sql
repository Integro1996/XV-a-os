CREATE TABLE `confirmations` (
	`id` text PRIMARY KEY NOT NULL,
	`edit_token` text NOT NULL,
	`name` text NOT NULL,
	`attendance` text NOT NULL,
	`guests` integer NOT NULL,
	`dietary` text NOT NULL,
	`message` text NOT NULL,
	`submitted_at` text NOT NULL,
	`updated_at` text NOT NULL
);
