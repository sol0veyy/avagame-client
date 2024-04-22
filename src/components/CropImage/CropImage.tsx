import React, { useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { useDebounceEffect } from './useDebounceEffect';
import { canvasPreview } from './canvasPreview';

interface CropImageProps {
    imgRef: React.MutableRefObject<HTMLImageElement>;
    previewCanvasRef: React.MutableRefObject<HTMLCanvasElement>;
    imgUrl: string;
    completedCrop: PixelCrop;
    setCompletedCrop: React.Dispatch<React.SetStateAction<PixelCrop>>;
}

const CropImage = ({
    imgRef,
    previewCanvasRef,
    imgUrl,
    completedCrop,
    setCompletedCrop,
}: CropImageProps) => {
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [crop, setCrop] = useState<Crop>();

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate
                );
            }
        },
        100,
        [completedCrop, scale, rotate]
    );

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 50,
                    height: 50  
                },
                1,
                width,
                height
            ),
            width,
            height
        );

        setCrop(crop);
    }

    return (
        <div>
            <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
            >
                <img onLoad={onImageLoad} ref={imgRef} src={imgUrl} />
            </ReactCrop>
            {!!completedCrop && (
                <>
                    <div className="hidden">
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                border: '1px solid black',
                                objectFit: 'contain',
                                width: completedCrop.width,
                                height: completedCrop.height,
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CropImage;
