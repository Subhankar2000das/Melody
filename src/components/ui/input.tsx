"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ rightIcon, onRightIconClick, className = "", ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          className={`w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-[#1db954] ${rightIcon ? "pr-11" : ""} ${className}`}
          {...props}
        />

        {rightIcon ? (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
          >
            {rightIcon}
          </button>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;