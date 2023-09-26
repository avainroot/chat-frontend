import React, {useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
import "./Loader.less";

export interface LoaderProps {
    tip?: string
    fixed?: boolean
    spinning?: boolean
    delay?: number
    size?: 'small' | 'middle' | 'large' | "extra-large"
    children?: React.ReactNode | React.ReactNodeArray
    className?: string
}

const prefixCls = "cmp-loader"

export const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
    const {size = "large", tip, delay = 500, spinning = true, className, fixed, children} = props;

    const [loading, setLoading] = useState<boolean>();
    const tmLoading = useRef<any>(null);

    useEffect(() => {

        if (spinning) {
            setLoading(spinning);
            return
        }

        if (tmLoading.current) {
            clearTimeout(tmLoading.current);
        }

        tmLoading.current = setTimeout(() => setLoading(spinning), delay);

    }, [spinning, delay]);

    return (
        <div className={clsx(`${prefixCls}`, `${prefixCls}-${size}`, className, {
            [`${prefixCls}-fixed`]: fixed
        })}>
            {loading && <div>
                <div className={clsx(`${prefixCls}-spin`)}/>
                {tip && <div className={clsx(`${prefixCls}-text`)}>{tip}</div>}
            </div>}
            <div className={clsx(`${prefixCls}-container`)}>{children}</div>
        </div>
    );
}