import React from 'react';
import { setCookie } from 'nookies';
import { Button, Form, Input, notification } from 'antd';
import { LoginFormDTO } from '@/api/dto/auth.dto';
import styles from './Auth.module.scss';

import * as Api from '@/api';

const LoginForm: React.FC = () => {
	const onSubmit = async (values: LoginFormDTO) => {
		try {
			const { token } = await Api.auth.login(values);
			notification.success({
				message: 'успешно',
				description: 'Переходим в админ-панель...',
				duration: 2,
			});
			setCookie(null, '_token', token, {
				path: '/',
			});
			location.href = '/dashboard';
		} catch (err) {
			console.warn('loginForm', err);
			notification.error({
				message: 'Сшибка!',
				description: 'Неверный логин или пароль',
				duration: 2,
			});
		}
	};

	return (
		<div className={styles.formBlock}>
			<Form name={'basic'} labelCol={{ span: 8 }} onFinish={onSubmit}>
				<Form.Item
					label={'E-Mail'}
					name={'email'}
					rules={[{ required: true, message: 'Укажите почту' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={'Пароль'}
					name={'password'}
					rules={[{ required: true, message: 'Укажите пароль' }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						Войти
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LoginForm;
