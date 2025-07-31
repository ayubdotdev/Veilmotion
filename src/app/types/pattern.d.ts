import { CSSProperties } from "react"

export interface Pattern {
    id: string
    name: string
    category: "Geometrics" | "Gradients" | "Effects" | "Floatings" | "Dots"
    description:string
    style:CSSProperties
    code:string
}