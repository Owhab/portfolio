import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function seedAdmin(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);
  const email = 'admin@example.com';
  const password = 'password';
  const existingAdmin = await repo.findOneBy({ email: email });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = repo.create({
      email: email,
      password: hashedPassword,
      name: 'Admin User',
      isActive: true,
    });
    await repo.save(admin);
    console.log('Admin user created with email: admin@example.com');
  } else {
    console.log('Admin user already exists.');
  }
}
