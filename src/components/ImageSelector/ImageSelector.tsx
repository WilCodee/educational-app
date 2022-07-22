import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};


interface IProps {
    setImage: any
}

const ImageSelector = ({setImage}:IProps) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        setImage(info.file.originFileObj)
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as RcFile, url => {
            setImageUrl(url);
        });
    }


    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    
    
    return (
        <div>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </div>
    );
};

export default ImageSelector; 