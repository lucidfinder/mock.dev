import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const MockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResponse').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDescription: varchar('jobDescription').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt'),
  mockId: varchar('mockId').notNull(),
});

export const UserAnswer = pgTable('userAnswer', {
  id: serial('id').primaryKey(),
  mockIdRef: varchar('mockId').notNull(),
  question: varchar('question').notNull(),
  correctAns: varchar('correctAns').notNull(),
  userAns: text('userAns').notNull(),
  feedback: text('feedback').notNull(),
  howToImprove: text('howToImprove').notNull(),
  areasOfImprovement: text('areasOfImprovement').notNull(),
  rating: varchar('rating').notNull(),
  userEmail: varchar('userEmail').notNull(),
  createdAt: varchar('createdAt').notNull(),
});
