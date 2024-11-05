import bcrypt from 'bcryptjs';

async function testPasswordMatching() {
    const password = 'securePassword123';
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Hashed password:', hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Ar slaptažodis sutampa:', isMatch);
}

testPasswordMatching();
