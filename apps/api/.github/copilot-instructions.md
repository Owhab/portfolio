# Portfolio API - Copilot Instructions

## Architecture Overview

NestJS v11 REST API for a portfolio website, using TypeORM with MySQL. The app manages portfolio content: skills, projects, experiences, educations, and settings.

### Module Structure Pattern

Each domain follows this structure:

```
src/{domain}/
  ├── {domain}.entity.ts      # TypeORM entity
  ├── {domain}.module.ts      # NestJS module
  ├── {domain}.controller.ts  # REST endpoints
  ├── dtos/
  │   ├── create-{domain}.dto.ts
  │   └── update-{domain}.dto.ts
  └── provider/
      └── {domain}.service.ts # Business logic
```

**Key convention**: Services live in `provider/` subdirectory, not at module root.

### Entity Relationships

- `Skill` → `SkillCategory` (ManyToOne with `onDelete: CASCADE`)
- `User` supports multiple auth providers (local, Google, GitHub)

## Code Patterns

### DTOs

- Use `class-validator` decorators for validation
- Update DTOs extend Create DTOs via `PartialType` from `@nestjs/mapped-types`:
  ```typescript
  export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
  ```

### Entity Conventions

- Use `@PrimaryGeneratedColumn()` (numeric IDs)
- Include `@CreateDateColumn()` and `@UpdateDateColumn()` for timestamps
- Common fields: `isActive: boolean`, `sortOrder: number`
- Use `@Index()` on frequently queried columns

### Service Pattern

- Inject repositories with `@InjectRepository(Entity)`
- Return message objects: `{ message: 'Action successful', entity: result }`
- Use `NotFoundException` for missing resources

### Enums

- Store in `src/common/enums/` with `.enum.ts` suffix
- Use as TypeORM enum columns: `@Column({ type: 'enum', enum: SkillLevel })`

## Authentication

Multi-provider auth using Passport strategies in `src/auth/strategies/`:

- `LocalStrategy` - email/password with bcrypt
- `JwtStrategy` - Bearer token validation
- `GoogleStrategy`, `GithubStrategy` - OAuth flows

Apply guards: `@UseGuards(AuthGuard('local'))` or `@UseGuards(AuthGuard('jwt'))`

## Commands

| Task       | Command            |
| ---------- | ------------------ |
| Dev server | `npm run dev`      |
| Build      | `npm run build`    |
| Unit tests | `npm test`         |
| E2E tests  | `npm run test:e2e` |
| Lint + fix | `npm run lint`     |
| Format     | `npm run format`   |

## Environment Variables

Required in `.env`:

```
DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME
DB_SYNCHRONIZE=true|false
DB_LOGGING=true|false
JWT_SECRET
# OAuth (optional): GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
```

## When Adding New Modules

1. Create entity with TypeORM decorators in `{domain}.entity.ts`
2. Create DTOs with class-validator in `dtos/`
3. Create service in `provider/{domain}.service.ts`
4. Create controller with REST decorators
5. Register module and import in `app.module.ts`
6. TypeORM auto-loads entities via `autoLoadEntities: true`
