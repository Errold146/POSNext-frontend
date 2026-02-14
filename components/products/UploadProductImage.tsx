"use client"

import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";

import { uploadImage } from "@/actions/upload-image-action";
import Image from "next/image";
import { getImagePath } from "@/utils";

export function UploadProductImage({currentImage}: {currentImage?: string}) {

    const [image, setImage] = useState('')

    const onDrop = useCallback( async (files: File[]) => {
        const formData = new FormData()
        files.forEach(file => {
            formData.append('file', file)
        })
        const image = await uploadImage(formData)
        setImage(image)
    }, [])

    const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
        },
        maxFiles: 1,
        onDrop,
    })

    const borderColor = isDragReject
        ? "border-milano-300 bg-milano-50"
        : isDragAccept
            ? "border-apple-400 bg-apple-50"
            : isDragActive
                ? "border-cielo-400 bg-cielo-50"
                : "border-cielo-200 bg-white hover:border-cielo-300 hover:bg-cielo-50/50"

    return (
        <div className="mt-5 space-y-2">
            <label className="block text-sm font-semibold text-cielo-900">
                Imagen del Producto
            </label>

            <div
                {...getRootProps({
                    className: `
                        group relative flex flex-col items-center justify-center gap-3
                        rounded-xl border-2 border-dashed px-6 py-10
                        shadow-sm transition-all duration-200 cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-apple-200
                        ${borderColor}
                    `,
                })}
            >
                <input {...getInputProps()} />

                {/* Icon */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200 ${
                    isDragReject
                        ? "bg-milano-100 text-milano-500"
                        : isDragAccept
                            ? "bg-apple-100 text-apple-600"
                            : "bg-cielo-100 text-cielo-500 group-hover:bg-cielo-200 group-hover:text-cielo-600"
                }`}>
                    {isDragReject ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zM8.25 8.625a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
                        </svg>
                    )}
                </div>

                {/* Text */}
                {isDragAccept && (
                    <p className="text-sm font-medium text-apple-600">Suelta la imagen aquí</p>
                )}
                {isDragReject && (
                    <p className="text-sm font-medium text-milano-500">Formato no válido</p>
                )}
                {!isDragActive && (
                    <div className="text-center">
                        <p className="text-sm font-medium text-cielo-700">
                            Arrastra una imagen o{" "}
                            <span className="text-apple-500 underline underline-offset-2">
                                haz clic para seleccionar
                            </span>
                        </p>
                        <p className="mt-1 text-xs text-cielo-400">
                            JPG, PNG o WebP
                        </p>
                    </div>
                )}
            </div>

            {image && (
                <div className="py-5 space-y-3">
                    <p className="font-bold text-apple-600">Nueva imagen del producto.</p>
                    <div className="w-75 h-105 relative">
                        <Image
                            src={image}
                            alt="Image of Product"
                            className="object-cover"
                            fill
                            priority
                        />
                    </div>
                </div>
            )}
            
            {currentImage && !image && (
                <div className="py-5 space-y-3">
                    <p className="font-bold text-apple-600">Actual imagen del producto.</p>
                    <div className="w-75 h-105 relative">
                        <Image
                            src={getImagePath(currentImage)}
                            alt="Image of Product"
                            className="object-cover"
                            fill
                            priority
                        />
                    </div>
                </div>
            )}

            <input 
                type="hidden"
                name="image"
                defaultValue={image ? image : currentImage}
            />
        </div>
    )
}
