import React from 'react';
import { Button, notification, Upload, UploadFile } from 'antd';
import styles from '@/styles/Home.module.scss';
import { CloudUploadOutlined } from '@ant-design/icons';

import * as Api from '@/api';

const UploadButton: React.FC = () => {
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);
	const onUploadSuccess = async (options: any) => {
		try {
			const file = await Api.files.uploadFile(options);
			setFileList([]);

			window.location.reload();
		} catch (err) {
			notification.error({
				message: 'Ошибка!',
				description: 'Не удалось загрузить файл',
				duration: 2,
			});
		}
	};
	return (
		<Upload
			className={styles.upload}
			customRequest={onUploadSuccess}
			onChange={({ fileList }) => setFileList(fileList)}
		>
			<Button type={'primary'} icon={<CloudUploadOutlined />} size={'large'}>
				Загрузить файл
			</Button>
		</Upload>
	);
};

export default UploadButton;
