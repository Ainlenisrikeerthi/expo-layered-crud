// 📘 CONCEPT (Zod): quick proof that the schema accepts good data and rejects bad data
import { studentFormSchema } from '../student.schema';

describe('studentFormSchema', () => {
  it('accepts valid data and converts age "21" → 21', () => {
    const result = studentFormSchema.safeParse({
      name: 'Ravi',
      age: '21',
      course: 'Web',
      email: '',
    });
    expect(result.success).toBe(true);
    expect(result.data?.age).toBe(21);
  });

  it('rejects a short name, young age and bad email', () => {
    const result = studentFormSchema.safeParse({
      name: 'A',
      age: '10',
      course: 'Web',
      email: 'abc',
    });
    expect(result.success).toBe(false);
    const fields = result.error?.issues.map((i) => i.path[0]);
    expect(fields).toEqual(expect.arrayContaining(['name', 'age', 'email']));
  });
});
