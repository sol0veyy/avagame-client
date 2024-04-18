declare module "*.module.css";
declare module "*.module.scss";
declare module "downloadjs";
declare module "*.png";
declare module "*.jpg";
declare module "*.svg" {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}