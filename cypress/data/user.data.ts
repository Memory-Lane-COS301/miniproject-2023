import { faker } from '@faker-js/faker'
import { User } from './User.interface';

const name = faker.name.firstName();
const surname = faker.name.lastName();
export const user:User = {
  name: name,
  surname: surname,
  username: faker.internet.userName(name, surname),
  email: faker.internet.email(name, surname),
  password: 'aVeryStr0ngP@swd_',
};

export const registredUser2 = {
  email: 'Bridget33@hotmail.com',
  password: 'aVeryStr0ngP@swd_',
}

export const registredUser = {
  email: 'Aiyana.Wiegand@hotmail.com',
  password: 'aVeryStr0ngP@swd_',
}