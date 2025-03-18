import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model";

export class UserService {

    static retrieveUsers(): UserModel[] {
        if (!localStorage.getItem('users')) {
            const arr: UserModel[] = [
                {
                    email: 'user@example.com',
                    firstName: 'Example',
                    lastName: 'User',
                    phone: '+3816123456789',
                    address: 'Kralja Milana, Požarevac',
                    favoriteGenre: 'Drama',
                    password: 'user123',
                    orders: []
                }
            ];
            localStorage.setItem('users', JSON.stringify(arr));
        }

        return JSON.parse(localStorage.getItem('users')!);
    }

    static createUser(model: UserModel) {
        const users = this.retrieveUsers();

        for (let u of users) {
            if (u.email === model.email)
                return false;
        }

        users.push(model);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    static updateUser(model: UserModel) {
        const users = this.retrieveUsers();
        for (let u of users) {
            if (u.email === model.email) {
                u.firstName = model.firstName;
                u.lastName = model.lastName;
                u.address = model.address;
                u.phone = model.phone;
                u.favoriteGenre = model.favoriteGenre;
            }
        }

        localStorage.setItem('users', JSON.stringify(users));
    }

    static login(email: string, password: string): boolean {
        for (let user of this.retrieveUsers()) {
            if (user.email === email && user.password === password) {
                localStorage.setItem('active', user.email);
                return true;
            }
        }
        return false;
    }

    static getActiveUser(): UserModel | null {
        if (!localStorage.getItem('active'))
            return null;

        for (let user of this.retrieveUsers()) {
            if (user.email === localStorage.getItem('active')) {
                return user;
            }
        }
        return null;
    }

    static createOrder(order: OrderModel) {
        const users = this.retrieveUsers();
        for (let user of users) {
            if (user.email == localStorage.getItem('active')) {
                user.orders.push(order);
                localStorage.setItem('users', JSON.stringify(users));
                return true;
            }
        }
        return false;
    }

    static changeOrderStatus(state: 'reserved' | 'watched' | 'canceled', id: number) {
        const active = this.getActiveUser();
        if (active) {
            const users = this.retrieveUsers();
            for (let user of users) {
                if (user.email == active.email) {
                    for (let order of user.orders) {
                        if (order.id == id) {
                            order.status = state;
                        }
                    }
                    localStorage.setItem('users', JSON.stringify(users));
                    return true;
                }
            }
        }
        return false;
    }
    static changeRating(rating: number, orderId: number): boolean {
        const activeUser = this.getActiveUser();
        if (!activeUser) return false;
    
        const users = this.retrieveUsers();
        for (let user of users) {
            if (user.email === activeUser.email) {
                for (let order of user.orders) {
                    if (order.id === orderId && order.status === 'watched') {
                        order.rating = rating;
                        localStorage.setItem('users', JSON.stringify(users));
                        return true;
                    }
                }
            }
        }
        return false;
    }
    static changePassword(newPassword: string): boolean {
        const users = this.retrieveUsers();
        for (let user of users) {
            if (user.email == localStorage.getItem('active')) {
                user.password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                return true;
            }
        }
        return false;
    }
}
