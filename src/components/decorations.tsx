import React from 'react'
import Image, { ImageProps } from 'next/image'

/**
 * Property for Arisu Component. inherit from ImageProps, but without src and alt
 */
interface ArisuProps extends Omit<ImageProps, 'src' | 'alt'> {

}

/**
 * Arisu component to display an image with default props.
 *
 * @param props - The props for the component.
 * @returns The Arisu image component.
 */
const Arisu: React.FC<ArisuProps> = ({ ...props })  => {
    return (
        <Image
            src="/images/decorations/arisu-1.png"
            alt="Arisu"
            {...props}
        />
    )
}

export { Arisu }
