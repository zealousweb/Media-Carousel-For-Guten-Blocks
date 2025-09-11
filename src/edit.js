/**
* Retrieves the translation of text.
*
* @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
*/
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
    BlockControls,
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";

/**
 * React hook that is used creates a collapsible container that can be toggled open or closed.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody  
 */
import {
    ToolbarGroup,
    ToolbarButton,
    PanelBody,
    SelectControl,
    ToggleControl,
    RadioControl,
    RangeControl,
    ColorPalette,
    Placeholder,
    Button,
    Panel,
    TextControl,
    Notice
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

import { useState, useEffect } from "@wordpress/element";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";

export default function Edit({ attributes, setAttributes }) {
    const { galleryImages = [], urls = [], sliderType, showArrows, arrowType, customPrevArrow, customNextArrow, simpleType, carouselType, speed, autoplay, infinite, caption, dotsType, dots, arrowColor, dotsColor, borderRadius, borderRadiusTop, borderRadiusRight, borderRadiusBottom, borderRadiusLeft, fancyboxBgColor, fancyboxWidth, fancyboxOpacity, arrowpos, slidesToShow, slidesToShowDesktop, slidesToShowTablet, slidesToShowMobile, slidesToScroll, fancybox, pauseOnHover, hideOnDesktop = false, hideOnTablet = false, hideOnMobile = false, hideArrowsOnDesktop = false, hideArrowsOnTablet = false, hideArrowsOnMobile = false, description = "", imageAspectRatio = "16:9", headingColor = "", descriptionColor = "" } = attributes;
    const [sliderId, setSliderId] = useState(attributes.sliderId || '');
    const [activeDevice, setActiveDevice] = useState('desktop');
    const [radiusLinked, setRadiusLinked] = useState(true);
    const [noticeMessage, setNoticeMessage] = useState('');

    useEffect(() => {
        if (!sliderId) {
            setSliderId(`mcfgb-slider-${sliderType}-${Math.floor(Math.random() * 1000)}`);
        }
    }, [sliderType, sliderId]);

    useEffect(() => {
        setAttributes({ ...attributes, sliderId });
    }, [sliderId]);

    // Migration for responsive slides - set default values if not present
    useEffect(() => {
        // For existing blocks with only slidesToShow
        if (slidesToShowDesktop === undefined && slidesToShow !== undefined) {
            setAttributes({ 
                slidesToShowDesktop: slidesToShow,
                slidesToShowTablet: Math.min(slidesToShow, 2),
                slidesToShowMobile: 1
            });
        }
        // For new blocks, ensure responsive values are set
        else if (slidesToShowDesktop === undefined) {
            setAttributes({ 
                slidesToShowDesktop: 2,
                slidesToShowTablet: 2,
                slidesToShowMobile: 1
            });
        }
        // Ensure all responsive values are set (fallback)
        if (slidesToShowDesktop === undefined || slidesToShowTablet === undefined || slidesToShowMobile === undefined) {
            setAttributes({ 
                slidesToShowDesktop: slidesToShowDesktop || 2,
                slidesToShowTablet: slidesToShowTablet || 2,
                slidesToShowMobile: slidesToShowMobile || 1
            });
        }
    }, []);

    // Migrate old borderRadius to new per-side values if not set
    useEffect(() => {
        if (
            borderRadius !== undefined &&
            borderRadiusTop === undefined &&
            borderRadiusRight === undefined &&
            borderRadiusBottom === undefined &&
            borderRadiusLeft === undefined
        ) {
            setAttributes({
                borderRadiusTop: borderRadius,
                borderRadiusRight: borderRadius,
                borderRadiusBottom: borderRadius,
                borderRadiusLeft: borderRadius,
            });
        }
    }, []);

    // Validate and clamp existing border radius values to ensure they don't exceed 100
    useEffect(() => {
        const needsUpdate = {};
        let hasChanges = false;

        // Check and clamp each border radius value
        if (borderRadiusTop !== undefined && (borderRadiusTop < 0 || borderRadiusTop > 100)) {
            needsUpdate.borderRadiusTop = Math.min(Math.max(borderRadiusTop, 0), 100);
            hasChanges = true;
        }
        if (borderRadiusRight !== undefined && (borderRadiusRight < 0 || borderRadiusRight > 100)) {
            needsUpdate.borderRadiusRight = Math.min(Math.max(borderRadiusRight, 0), 100);
            hasChanges = true;
        }
        if (borderRadiusBottom !== undefined && (borderRadiusBottom < 0 || borderRadiusBottom > 100)) {
            needsUpdate.borderRadiusBottom = Math.min(Math.max(borderRadiusBottom, 0), 100);
            hasChanges = true;
        }
        if (borderRadiusLeft !== undefined && (borderRadiusLeft < 0 || borderRadiusLeft > 100)) {
            needsUpdate.borderRadiusLeft = Math.min(Math.max(borderRadiusLeft, 0), 100);
            hasChanges = true;
        }

        // Update attributes if any values need clamping
        if (hasChanges) {
            setAttributes(needsUpdate);
        }
    }, [borderRadiusTop, borderRadiusRight, borderRadiusBottom, borderRadiusLeft]);

    // Helper to update all sides
    const setAllRadius = (value) => {
        // Ensure value is a number and clamp it to valid range
        const numValue = parseInt(value) || 0;
        const clampedValue = Math.min(Math.max(numValue, 0), 100);
        setAttributes({
            borderRadiusTop: clampedValue,
            borderRadiusRight: clampedValue,
            borderRadiusBottom: clampedValue,
            borderRadiusLeft: clampedValue,
        });
    };

    // UI for Elementor-style border radius
    const BorderRadiusControl = () => (
        <div style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 500, fontSize: 13, display: 'block', marginBottom: 8 }}>{__("Border Radius", "media-carousel-for-guten-blocks")}</span>
            <div className="mcfgb-radius-control">
                <input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={borderRadiusTop ?? 0}
                    onChange={e => {
                        const value = parseInt(e.target.value) || 0;
                        const clampedValue = Math.min(Math.max(value, 0), 100);
                        if (radiusLinked) setAllRadius(clampedValue);
                        else setAttributes({ borderRadiusTop: clampedValue });
                    }}
                    onBlur={e => {
                        // Additional validation on blur to ensure value is within range
                        const value = parseInt(e.target.value) || 0;
                        const clampedValue = Math.min(Math.max(value, 0), 100);
                        if (value !== clampedValue) {
                            if (radiusLinked) setAllRadius(clampedValue);
                            else setAttributes({ borderRadiusTop: clampedValue });
                        }
                    }}
                    aria-label={__('Top', 'media-carousel-for-guten-blocks')}
                    title={__('Border radius value (0-100)', 'media-carousel-for-guten-blocks')}
                />
                <input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={borderRadiusRight ?? 0}
                    onChange={e => {
                        const value = parseInt(e.target.value) || 0;
                        const clampedValue = Math.min(Math.max(value, 0), 100);
                        if (radiusLinked) setAllRadius(clampedValue);
                        else setAttributes({ borderRadiusRight: clampedValue });
                    }}
                    onBlur={e => {
                        // Additional validation on blur to ensure value is within range
                        const value = parseInt(e.target.value) || 0;
                        const clampedValue = Math.min(Math.max(value, 0), 100);
                        if (value !== clampedValue) {
                            if (radiusLinked) setAllRadius(clampedValue);
                            else setAttributes({ borderRadiusRight: clampedValue });
                        }
                    }}
                    aria-label={__('Right', 'media-carousel-for-guten-blocks')}
                    title={__('Border radius value (0-100)', 'media-carousel-for-guten-blocks')}
                />
                <input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={borderRadiusBottom ?? 0}
                    onChange={e => {
                        const value = parseInt(e.target.value) || 0;
                        const clampedValue = Math.min(Math.max(value, 0), 100);
                        if (radiusLinked) setAllRadius(clampedValue);
                        else setAttributes({ borderRadiusBottom: clampedValue });
                    }}
                    onBlur={e => {
                        // Additional validation on blur to ensure value is within range
                        const value = parseInt(e.target.value) || 0;
                        const clampedValue = Math.min(Math.max(value, 0), 100);
                        if (value !== clampedValue) {
                            if (radiusLinked) setAllRadius(clampedValue);
                            else setAttributes({ borderRadiusBottom: clampedValue });
                        }
                    }}
                    aria-label={__('Bottom', 'media-carousel-for-guten-blocks')}
                    title={__('Border radius value (0-100)', 'media-carousel-for-guten-blocks')}
                />
                <input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={borderRadiusLeft ?? 0}
                    onChange={e => {
                        const value = parseInt(e.target.value) || 0;
                        const clampedValue = Math.min(Math.max(value, 0), 100);
                        if (radiusLinked) setAllRadius(clampedValue);
                        else setAttributes({ borderRadiusLeft: clampedValue });
                    }}
                    onBlur={e => {
                        // Additional validation on blur to ensure value is within range
                        const value = parseInt(e.target.value) || 0;
                        const clampedValue = Math.min(Math.max(value, 0), 100);
                        if (value !== clampedValue) {
                            if (radiusLinked) setAllRadius(clampedValue);
                            else setAttributes({ borderRadiusLeft: clampedValue });
                        }
                    }}
                    aria-label={__('Left', 'media-carousel-for-guten-blocks')}
                    title={__('Border radius value (0-100)', 'media-carousel-for-guten-blocks')}
                />
                <button
                    type="button"
                    className={radiusLinked ? 'linked' : ''}
                    onClick={() => setRadiusLinked(!radiusLinked)}
                    aria-label={radiusLinked ? __('Unlink values', 'media-carousel-for-guten-blocks') : __('Link values', 'media-carousel-for-guten-blocks')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"></path></svg>
                </button>
            </div>
            <div className="mcfgb-radius-labels">
                <span>{__('Top', 'media-carousel-for-guten-blocks')}</span>
                <span>{__('Right', 'media-carousel-for-guten-blocks')}</span>
                <span>{__('Bottom', 'media-carousel-for-guten-blocks')}</span>
                <span>{__('Left', 'media-carousel-for-guten-blocks')}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#555555', marginTop: '4px' }}>
                {__('Maximum value: 100px', 'media-carousel-for-guten-blocks')}
            </div>
            <div style={{ fontSize: '12px', color: '#555555', marginTop: '4px' }}>
                {__('Desktop Border Radius', 'media-carousel-for-guten-blocks')}: {borderRadiusTop || 0}px
            </div>
        </div>
    );

    // Aspect Ratio Control Component
    const AspectRatioControl = () => (
        <div style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 500, fontSize: 13, display: 'block', marginBottom: 8 }}>{__("Image Aspect Ratio", "media-carousel-for-guten-blocks")}</span>
            <SelectControl
                value={imageAspectRatio}
                options={[
                    { label: __("16:9 (Widescreen)", "media-carousel-for-guten-blocks"), value: "16:9" },
                    { label: __("4:3 (Standard)", "media-carousel-for-guten-blocks"), value: "4:3" },
                    { label: __("1:1 (Square)", "media-carousel-for-guten-blocks"), value: "1:1" },
                    { label: __("3:2 (Photo)", "media-carousel-for-guten-blocks"), value: "3:2" },
                    { label: __("21:9 (Ultrawide)", "media-carousel-for-guten-blocks"), value: "21:9" }
                ]}
                onChange={(value) => setAttributes({ imageAspectRatio: value })}
            />
        </div>
    );

    const colors = [
        { color: '#F9F9F9' },
        { color: '#A4A4A4' },
        { color: '#636363' },
        { color: '#111111' },
        { color: '#FFFFFF' },
        { color: '#C2A990' },
        { color: '#CFCABE' },
        { color: '#D8613C' },
        { color: '#B1C5A4' },
    ];

    const deviceOptions = [
        { key: 'desktop', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="2" stroke="#222" strokeWidth="2"/><path d="M8 20h8M12 16v4" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>
        ) },
        { key: 'tablet', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" stroke="#222" strokeWidth="2"/><circle cx="12" cy="18" r="1" fill="#222"/></svg>
        ) },
        { key: 'mobile', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="2" stroke="#222" strokeWidth="2"/><circle cx="12" cy="18" r="1" fill="#222"/></svg>
        ) },
    ];

    const deviceValue = {
        desktop: slidesToShowDesktop,
        tablet: slidesToShowTablet,
        mobile: slidesToShowMobile,
    };
    const deviceMin = { desktop: 1, tablet: 1, mobile: 1 };
    const deviceMax = { desktop: 6, tablet: 4, mobile: 2 };
    const deviceLabel = { desktop: 'Desktop', tablet: 'Tablet', mobile: 'Mobile' };

    const handleSliderChange = (value) => {
        const intValue = parseInt(value) || 1;
        if (activeDevice === 'desktop') setAttributes({ slidesToShowDesktop: intValue });
        if (activeDevice === 'tablet') setAttributes({ slidesToShowTablet: intValue });
        if (activeDevice === 'mobile') setAttributes({ slidesToShowMobile: intValue });
    };

    // Dynamically set border radius for editor preview
    const blockProps = useBlockProps({
        style: {
            ['--mcfgb-border-radius']: `${
                (typeof borderRadiusTop !== 'undefined' && typeof borderRadiusRight !== 'undefined' && typeof borderRadiusBottom !== 'undefined' && typeof borderRadiusLeft !== 'undefined')
                    ? `${borderRadiusTop || 0}px ${borderRadiusRight || 0}px ${borderRadiusBottom || 0}px ${borderRadiusLeft || 0}px`
                    : `${borderRadius || 0}px`
            }`
        }
    });

    return (
        <>
            <InspectorControls>
                <Panel title={__("Media Carousel Settings", "media-carousel-for-guten-blocks")}>
                   
                    <PanelBody title={__("Media Item Settings", "media-carousel-for-guten-blocks")} initialOpen={true}>
                        <AspectRatioControl />
                        <BorderRadiusControl />
                        
                        <ToggleControl
                            label={__("Enable Caption", "media-carousel-for-guten-blocks")}
                            checked={caption}
                            onChange={(val) => {
                                setAttributes({ caption: val });
                            }}
                        />
                        <ToggleControl
                            label={__("Enable FancyBox", "media-carousel-for-guten-blocks")}
                            checked={fancybox}
                            onChange={(val) => {
                                setAttributes({ fancybox: val });
                            }}
                        />
                        {caption && (
                            <>
                                <div style={{ marginTop: '12px' }}>
                                    <span className="color">{__("Heading Color", "media-carousel-for-guten-blocks")}</span>
                                    <ColorPalette
                                        value={headingColor}
                                        onChange={(color) => setAttributes({ headingColor: color })}
                                        colors={colors}
                                    />
                                </div>
                                <div style={{ marginTop: '12px' }}>
                                    <span className="color">{__("Description Color", "media-carousel-for-guten-blocks")}</span>
                                    <ColorPalette
                                        value={descriptionColor}
                                        onChange={(color) => setAttributes({ descriptionColor: color })}
                                        colors={colors}
                                    />
                                </div>
                            </>
                        )}
                    </PanelBody>
                    <PanelBody title={__("Slider Type Settings", "media-carousel-for-guten-blocks")} initialOpen={true} id={sliderId}>
                        {/*<RadioControl
                            label={__("Slider Type", "media-carousel-for-guten-blocks")}
                            selected={sliderType}
                            options={[
                                { label: __("Simple Type", "media-carousel-for-guten-blocks"), value: "simpleType" },
                                { label: __("Carousel Type", "media-carousel-for-guten-blocks"), value: "carouselType" },
                            ]}
                            onChange={(val) => {
                                setAttributes({ sliderType: val });
                            }}
                        />
                         {sliderType && (
                            <>
                                {sliderType === "simpleType" && (
                                    <>
                                        <img src={simple} className="type_image" />
                                        <SelectControl
                                            label={__("Simple Slider Type", "media-carousel-for-guten-blocks")}
                                            value={simpleType}
                                            options={[
                                                { label: __("Simple", "media-carousel-for-guten-blocks"), value: "simple" },
                                                { label: __("Fade", "media-carousel-for-guten-blocks"), value: "fade" },
                                                { label: __("Adaptive Height", "media-carousel-for-guten-blocks"), value: "adaptiveheight" },
                                            ]}
                                            onChange={(val) => {
                                                setAttributes({ simpleType: val });
                                            }}
                                        />
                                    </>
                                )}
                                {sliderType === "carouselType" && (
                                    <>
                                        <img src={carousel} className="type_image" />
                                        <SelectControl
                                            label={__("Carousel Slider Type", "media-carousel-for-guten-blocks")}
                                            value={carouselType}
                                            options={[
                                                { label: __("Carousel", "media-carousel-for-guten-blocks"), value: "carousel" },
                                                { label: __("Center Mode", "media-carousel-for-guten-blocks"), value: "centermode" },
                                            ]}
                                            onChange={(val) => {
                                                setAttributes({ carouselType: val });
                                            }}
                                        />

                                        <RangeControl
                                            label={__("Slides To Scroll", "media-carousel-for-guten-blocks")}
                                            value={slidesToScroll}
                                            onChange={(value) => setAttributes({ slidesToScroll: value })}
                                            min={1}
                                            max={3}
                                        />

                                    </>
                                )}
                            </>
                        )} */}
                        
                        {/* Responsive controls for all slider types */}
                        {(sliderType === "carouselType" || sliderType === "simpleType") && (
                            <>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
                                        {__('Slide to Show', 'media-carousel-for-guten-blocks')}
                                    </label>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                        {deviceOptions.map((dev) => (
                                            <button
                                                key={dev.key}
                                                type="button"
                                                onClick={() => setActiveDevice(dev.key)}
                                                style={{
                                                    background: activeDevice === dev.key ? '#007cba' : '#fff',
                                                    border: '1px solid #ccd0d4',
                                                    borderRadius: '4px',
                                                    padding: '4px 8px',
                                                    cursor: 'pointer',
                                                    outline: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color: activeDevice === dev.key ? '#fff' : '#222',
                                                }}
                                                aria-label={deviceLabel[dev.key]}
                                            >
                                                {dev.icon}
                                            </button>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <input
                                            type="range"
                                            min={deviceMin[activeDevice]}
                                            max={deviceMax[activeDevice]}
                                            value={deviceValue[activeDevice]}
                                            onChange={(e) => handleSliderChange(e.target.value)}
                                            style={{ flex: 1 }}
                                        />
                                        <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 'bold' }}>{deviceValue[activeDevice]}</span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>
                                        {deviceLabel[activeDevice]} Columns: {deviceValue[activeDevice]}
                                    </div>
                                </div>
                            </>
                        )}
                        <RangeControl
                            label={__("Delay Speed of Slider", "media-carousel-for-guten-blocks")}
                            value={speed}
                            onChange={(value) => setAttributes({ speed: value })}
                            min={1000}
                            max={5000}
                            step={1000}
                        />
                        <div style={{ fontSize: '12px', color: '#555555', marginBottom: '16px' }}>
                            {__("Delay Speed", "media-carousel-for-guten-blocks")}: {(speed || 1000) / 1000}s
                        </div>
                        <ToggleControl
                            label={__("Pause on hover", "media-carousel-for-guten-blocks")}
                            checked={pauseOnHover}
                            onChange={(val) => {
                                setAttributes({ pauseOnHover: val });
                            }}
                        />
                        <ToggleControl
                            label={__("Auto Play", "media-carousel-for-guten-blocks")}
                            checked={autoplay}
                            onChange={(val) => {
                                setAttributes({ autoplay: val });
                            }}
                        />
                        <ToggleControl
                            label={__("Infinite", "media-carousel-for-guten-blocks")}
                            checked={infinite}
                            onChange={(val) => {
                                setAttributes({ infinite: val });
                            }}
                        />
                        <ToggleControl
                            label={__("Dots", "media-carousel-for-guten-blocks")}
                            checked={dots}
                            onChange={(val) => {
                                setAttributes({ dots: val });
                            }}
                        />
                        {dots && (
                            <>
                                <SelectControl
                                    label={__("Dots Type", "media-carousel-for-guten-blocks")}
                                    value={dotsType}
                                    options={[
                                        { label: "Normal Dots", value: "ndots" },
                                        { label: "Number", value: "number" },
                                    ]}
                                    onChange={(val) => {
                                        setAttributes({ dotsType: val });
                                    }}
                                />
                                <span className="color">
                                    {dotsType === "number" ? __("Number Color", "media-carousel-for-guten-blocks") : __("Dots Color", "media-carousel-for-guten-blocks")}
                                </span>
                                <ColorPalette
                                    value={dotsColor}
                                    onChange={(color) => setAttributes({ dotsColor: color })}
                                    colors={colors}
                                />
                            </>
                        )}
                        <ToggleControl
                            label={__("Show Arrows", "media-carousel-for-guten-blocks")}
                            checked={showArrows}
                            onChange={(val) => {
                                setAttributes({ showArrows: val });
                            }}
                        />
                        {showArrows && (
                            <>
                                <RadioControl
                                    className={` arrowclass  ${arrowType} ${sliderId}`}
                                    label={
                                        <span>
                                            {__("Arrow Type", "media-carousel-for-guten-blocks")}
                                        </span>
                                    }
                                    selected={arrowType}
                                    options={[
                                        {
                                            label: <>

                                                <div class="svg-arrow">
                                                    <div class="prev-btn">
                                                        <svg viewBox="0 0 30.725 30.725"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24.078,26.457c0.977,0.978,0.977,2.559,0,3.536c-0.488,0.488-1.128,0.731-1.77,0.731c-0.639,0-1.278-0.243-1.768-0.731 L5.914,15.362l14.629-14.63c0.977-0.977,2.559-0.976,3.535,0c0.977,0.977,0.977,2.56,0,3.536L12.984,15.362L24.078,26.457z"></path> </g> </g></svg>
                                                    </div>
                                                    <div class="next-btn">
                                                        <svg viewBox="0 0 30.725 30.725"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24.078,26.457c0.977,0.978,0.977,2.559,0,3.536c-0.488,0.488-1.128,0.731-1.77,0.731c-0.639,0-1.278-0.243-1.768-0.731 L5.914,15.362l14.629-14.63c0.977-0.977,2.559-0.976,3.535,0c0.977,0.977,0.977,2.56,0,3.536L12.984,15.362L24.078,26.457z"></path> </g> </g></svg>
                                                    </div>
                                                </div>
                                            </>, value: "custom1"
                                        },
                                        {
                                            label: <>
                                                <div class="svg-arrow">
                                                    <div class="prev-btn">
                                                        <svg viewBox="0 0 8 8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="-0.226" y="4.614" transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)" width="5.283" height="1.466"></rect> <rect x="1.607" y="3.161" width="6.375" height="1.683"></rect> <rect x="-0.233" y="1.921" transform="matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)" width="5.284" height="1.465"></rect> </g></svg>
                                                    </div>
                                                    <div class="next-btn">
                                                        <svg viewBox="0 0 8 8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="-0.226" y="4.614" transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)" width="5.283" height="1.466"></rect> <rect x="1.607" y="3.161" width="6.375" height="1.683"></rect> <rect x="-0.233" y="1.921" transform="matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)" width="5.284" height="1.465"></rect> </g></svg>
                                                    </div>
                                                </div>
                                            </>, value: "custom2"
                                        },
                                        {
                                            label: <>

                                                <div class="svg-arrow">
                                                    <div class="prev-btn">
                                                        <svg viewBox="0 0 512.013 512.013"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M366.64,256.013L508.677,32.802c5.141-8.107,4.267-18.624-2.176-25.749c-6.443-7.168-16.832-9.067-25.365-4.8 L11.802,236.92c-7.232,3.627-11.797,11.008-11.797,19.093c0,8.085,4.565,15.467,11.797,19.093l469.333,234.667 c3.029,1.515,6.293,2.24,9.536,2.24c5.888,0,11.691-2.432,15.829-7.04c6.443-7.125,7.317-17.643,2.176-25.749L366.64,256.013z"></path> </g> </g> </g></svg>
                                                    </div>
                                                    <div class="next-btn">
                                                        <svg viewBox="0 0 512.013 512.013"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M366.64,256.013L508.677,32.802c5.141-8.107,4.267-18.624-2.176-25.749c-6.443-7.168-16.832-9.067-25.365-4.8 L11.802,236.92c-7.232,3.627-11.797,11.008-11.797,19.093c0,8.085,4.565,15.467,11.797,19.093l469.333,234.667 c3.029,1.515,6.293,2.24,9.536,2.24c5.888,0,11.691-2.432,15.829-7.04c6.443-7.125,7.317-17.643,2.176-25.749L366.64,256.013z"></path> </g> </g> </g></svg>
                                                    </div>
                                                </div>
                                            </>, value: "custom3"
                                        },
                                        {
                                            label: <>

                                                <div class="svg-arrow">
                                                    <div class="prev-btn">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path d="M31.5,22.5v6a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3v-6M25.5,12,18,4.5,10.5,12M18,4.5v18" transform="translate(-3 -3)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></svg>
                                                    </div>
                                                    <div class="next-btn">
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                                            <path d="M9 9h.01"/>
                                                            <path d="M15 9h.01"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </>, value: "custom"
                                        },
                                    ]}
                                    onChange={(val) => {
                                        setAttributes({ arrowType: val });
                                    }}
                                />

                                {arrowType === 'custom' && (
                                    <>
                                        <div style={{ marginBottom: '16px' }}>
                                            <span style={{ fontWeight: 500, fontSize: 13, display: 'block', marginBottom: 8 }}>{__("Custom Arrow Icons", "media-carousel-for-guten-blocks")}</span>
                                            
                                            {noticeMessage && (
                                                <Notice status="error" isDismissible={false} style={{ marginBottom: '12px' }}>
                                                    {noticeMessage}
                                                </Notice>
                                            )}
                                            
                                            <div style={{ marginBottom: '12px' }}>
                                                <span style={{ fontSize: 12, color: '#666' }} data-tooltip={__("Upload an image for the previous/left navigation arrow. Recommended size: 30x30px", "media-carousel-for-guten-blocks")}>{__("Previous Arrow", "media-carousel-for-guten-blocks")}</span>
                                                <MediaUploadCheck>
                                                    <MediaUpload
                                                        onSelect={(media) => {
                                                            // Validate file type - only allow PNG and SVG
                                                            const allowedMimeTypes = ['image/png', 'image/svg+xml'];
                                                            if (!allowedMimeTypes.includes(media.mime)) {
                                                                setNoticeMessage(__('Please upload only PNG or SVG files for the arrow icon.', 'media-carousel-for-guten-blocks'));
                                                                setTimeout(() => setNoticeMessage(''), 5000);
                                                                return;
                                                            }
                                                            setNoticeMessage('');
                                                            setAttributes({ customPrevArrow: media });
                                                        }}
                                                        allowedTypes={['image']}
                                                        value={customPrevArrow ? customPrevArrow.id : ''}
                                                        render={({ open }) => (
                                                            <div style={{ marginTop: '8px' }}>
                                                                {customPrevArrow ? (
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                        <img 
                                                                            src={customPrevArrow.url} 
                                                                            alt={customPrevArrow.alt || 'Previous Arrow'} 
                                                                            style={{ width: '30px', height: '30px', objectFit: 'contain' }}
                                                                        />
                                                                        <Button 
                                                                            isSmall 
                                                                            onClick={open}
                                                                            variant="secondary"
                                                                        >
                                                                            {__("Change", "media-carousel-for-guten-blocks")}
                                                                        </Button>
                                                                        <Button 
                                                                            isSmall 
                                                                            onClick={() => setAttributes({ customPrevArrow: null })}
                                                                            variant="tertiary"
                                                                        >
                                                                            {__("Remove", "media-carousel-for-guten-blocks")}
                                                                        </Button>
                                                                    </div>
                                                                ) : (
                                                                    <Button 
                                                                        isSmall 
                                                                        onClick={open}
                                                                        variant="secondary"
                                                                    >
                                                                        {__("Upload Previous Arrow", "media-carousel-for-guten-blocks")}
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        )}
                                                    />
                                                </MediaUploadCheck>
                                            </div>

                                            <div style={{ marginBottom: '12px' }}>
                                                <span style={{ fontSize: 12, color: '#666' }} data-tooltip={__("Upload an image for the next/right navigation arrow. Recommended size: 30x30px", "media-carousel-for-guten-blocks")}>{__("Next Arrow", "media-carousel-for-guten-blocks")}</span>
                                                <MediaUploadCheck>
                                                    <MediaUpload
                                                        onSelect={(media) => {
                                                            // Validate file type - only allow PNG and SVG
                                                            const allowedMimeTypes = ['image/png', 'image/svg+xml'];
                                                            if (!allowedMimeTypes.includes(media.mime)) {
                                                                setNoticeMessage(__('Please upload only PNG or SVG files for the arrow icon.', 'media-carousel-for-guten-blocks'));
                                                                setTimeout(() => setNoticeMessage(''), 5000);
                                                                return;
                                                            }
                                                            setNoticeMessage('');
                                                            setAttributes({ customNextArrow: media });
                                                        }}
                                                        allowedTypes={['image']}
                                                        value={customNextArrow ? customNextArrow.id : ''}
                                                        render={({ open }) => (
                                                            <div style={{ marginTop: '8px' }}>
                                                                {customNextArrow ? (
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                        <img 
                                                                            src={customNextArrow.url} 
                                                                            alt={customNextArrow.alt || 'Next Arrow'} 
                                                                            style={{ width: '30px', height: '30px', objectFit: 'contain' }}
                                                                        />
                                                                        <Button 
                                                                            isSmall 
                                                                            onClick={open}
                                                                            variant="secondary"
                                                                        >
                                                                            {__("Change", "media-carousel-for-guten-blocks")}
                                                                        </Button>
                                                                        <Button 
                                                                            isSmall 
                                                                            onClick={() => setAttributes({ customNextArrow: null })}
                                                                            variant="tertiary"
                                                                        >
                                                                            {__("Remove", "media-carousel-for-guten-blocks")}
                                                                        </Button>
                                                                    </div>
                                                                ) : (
                                                                    <Button 
                                                                        isSmall 
                                                                        onClick={open}
                                                                        variant="secondary"
                                                                    >
                                                                        {__("Upload Next Arrow", "media-carousel-for-guten-blocks")}
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        )}
                                                    />
                                                </MediaUploadCheck>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {arrowType !== 'custom' && (
                                    <>
                                        <span className="color">{__("Arrow Color", "media-carousel-for-guten-blocks")}</span>
                                        <ColorPalette
                                            value={arrowColor}
                                            onChange={(color) => setAttributes({ arrowColor: color })}
                                            colors={colors}
                                        />
                                    </>
                                )}

                                <RadioControl
                                    className="arrowpos"
                                    label={__("Arrow Position", "media-carousel-for-guten-blocks")}
                                    selected={arrowpos}
                                    options={[
                                        { label: "Bottom", value: "bottom" },
                                        { label: "Side", value: "side" },
                                    ]}
                                    onChange={(val) => {
                                        setAttributes({ arrowpos: val });
                                    }}
                                />


                            </>
                        )}
                    </PanelBody>
                    {/* Arrow Responsive Visibility Controls */}
                    {showArrows && (
                        <PanelBody title={__("Arrow Responsive Visibility", "media-carousel-for-guten-blocks")} initialOpen={false}>
                            <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                                {__("Control arrow visibility on different devices. These settings will take effect only on the front view page.", "media-carousel-for-guten-blocks")}
                            </p>
                            <ToggleControl
                                label={__("Hide Arrows on Desktop", "media-carousel-for-guten-blocks")}
                                checked={hideArrowsOnDesktop}
                                onChange={(val) => setAttributes({ hideArrowsOnDesktop: val })}
                            />
                            <ToggleControl
                                label={__("Hide Arrows on Tablet", "media-carousel-for-guten-blocks")}
                                checked={hideArrowsOnTablet}
                                onChange={(val) => setAttributes({ hideArrowsOnTablet: val })}
                            />
                            <ToggleControl
                                label={__("Hide Arrows on Mobile", "media-carousel-for-guten-blocks")}
                                checked={hideArrowsOnMobile}
                                onChange={(val) => setAttributes({ hideArrowsOnMobile: val })}
                            />
                        </PanelBody>
                    )}
                    <PanelBody title={__("Responsive Visibility", "media-carousel-for-guten-blocks")} initialOpen={false}>
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                            {__("Responsive visibility will take effect only on front view page.", "media-carousel-for-guten-blocks")}
                        </p>
                        <ToggleControl
                            label={__("Hide on Desktop", "media-carousel-for-guten-blocks")}
                            checked={hideOnDesktop}
                            onChange={(val) => setAttributes({ hideOnDesktop: val })}
                        />
                        <ToggleControl
                            label={__("Hide on Tablet", "media-carousel-for-guten-blocks")}
                            checked={hideOnTablet}
                            onChange={(val) => setAttributes({ hideOnTablet: val })}
                        />
                        <ToggleControl
                            label={__("Hide on Mobile", "media-carousel-for-guten-blocks")}
                            checked={hideOnMobile}
                            onChange={(val) => setAttributes({ hideOnMobile: val })}
                        />
                    </PanelBody>
                </Panel>
            </InspectorControls>

            <BlockControls>
                <ToolbarGroup>
                    <MediaUploadCheck>
                        <MediaUpload
                            multiple="add"
                            onSelect={(val) => {
                                // Filter out any duplicate images
                                const filteredVal = val.filter((media) => {
                                    return !galleryImages.some((img) => img.id === media.id);
                                });

                                // Filter out any removed images
                                const updatedGallery = galleryImages.filter((img) => {
                                    return val.some((media) => media.id === img.id);
                                }).map((img) => ({
                                    id: img.id,
                                    url: img.url,
                                    alt: img.alt,
                                    type: img.type,
                                    caption: img.caption || '',
                                    description: img.description || ''
                                }));

                                // Merge filtered newly selected media with the updated gallery, preserving captions
                                const finalGallery = [
                                    ...updatedGallery,
                                    ...filteredVal.map((media) => ({
                                        id: media.id,
                                        url: media.url,
                                        alt: media.alt,
                                        type: media.type,
                                        caption: media.caption || '', // Set a default caption if not provided
                                        description: media.description || ''
                                    }))
                                ];

                                // Update URLs array to match the new gallery
                                const updatedUrls = finalGallery.map((media, index) => {
                                    // Preserve existing URL if it exists, otherwise set empty string
                                    return urls[index] || '';
                                });

                                setAttributes({ 
                                    galleryImages: finalGallery,
                                    urls: updatedUrls
                                });
                            }}

                            allowedTypes={['image', 'video']}
                            value={galleryImages.map((val) => val.id)}
                            render={({ open }) => (
                                <ToolbarButton
                                    label={__("Edit Images")}
                                    onClick={() => {
                                        open();
                                    }}
                                    icon="edit"
                                />
                            )}
                        />
                    </MediaUploadCheck>
                </ToolbarGroup>
            </BlockControls>

            <div {...blockProps} id={sliderId}>
                {galleryImages && galleryImages.length > 0 ? (
                    <div class="slider-boxwrap">
                        {galleryImages.map((media, index) => (
                            <div key={media.id} className="mcfgb-gallery-single">
                                {media.type === 'image' ? (
                                    <>
                                        <img src={media.url} alt={media.alt ? media.alt : "Gallery Image"} />
                                        {!fancybox && (
                                            <input
                                                type="text"
                                                className="ytb-url"
                                                value={urls[index] || ''}
                                                onChange={(event) => {
                                                    const updatedUrls = [...urls];
                                                    updatedUrls[index] = event.target.value;
                                                    setAttributes({ urls: updatedUrls });
                                                }}
                                                placeholder="Enter URL "
                                            />
                                        )}
                                        {caption && (
                                            <input
                                                type="text"
                                                className="caption"
                                                value={media.caption || ''}
                                                onChange={(event) => {
                                                    const updatedGallery = [...galleryImages];
                                                    updatedGallery[index].caption = event.target.value;
                                                    setAttributes({ galleryImages: updatedGallery });
                                                }}
                                                placeholder="Heading"
                                            />
                                        )}
                                        {caption && (
                                            <textarea
                                                className="description"
                                                value={media.description || ''}
                                                onChange={(event) => {
                                                    const updatedGallery = [...galleryImages];
                                                    updatedGallery[index].description = event.target.value;
                                                    setAttributes({ galleryImages: updatedGallery });
                                                }}
                                                placeholder="Description"
                                                rows="3"
                                                style={{
                                                    width: '100%',
                                                    marginTop: '5px',
                                                    padding: '8px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    resize: 'vertical',
                                                    fontFamily: 'inherit',
                                                    fontSize: '14px'
                                                }}
                                            />
                                        )}

                                    </>
                                ) : media.type === 'video' ? (
                                    <>
                                        <div className="video-thumbnail-container" style={{ position: 'relative', width: '100%' }}>
                                            <video 
                                                ref={(el) => {
                                                    if (el) {
                                                        // Set up video thumbnail generation
                                                        el.addEventListener('loadedmetadata', () => {
                                                            // Seek to the first frame (0.1 seconds to ensure we get a frame)
                                                            el.currentTime = 0.1;
                                                        });
                                                        
                                                        el.addEventListener('seeked', () => {
                                                            // Create canvas to capture the current frame
                                                            const canvas = document.createElement('canvas');
                                                            const ctx = canvas.getContext('2d');
                                                            
                                                            // Set canvas dimensions to match video
                                                            canvas.width = el.videoWidth || 640;
                                                            canvas.height = el.videoHeight || 360;
                                                            
                                                            try {
                                                                // Draw the current frame
                                                                ctx.drawImage(el, 0, 0, canvas.width, canvas.height);
                                                                
                                                                // Convert to data URL for thumbnail
                                                                const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
                                                                
                                                                // Store thumbnail URL in media object
                                                                const updatedGallery = [...galleryImages];
                                                                updatedGallery[index].thumbnailUrl = thumbnailUrl;
                                                                setAttributes({ galleryImages: updatedGallery });
                                                            } catch (error) {
                                                                // Error generating video thumbnail
                                                            }
                                                        });
                                                        
                                                        // Handle video load errors
                                                        el.addEventListener('error', () => {
                                                            // Error loading video for thumbnail generation
                                                        });
                                                    }
                                                }}
                                                style={{ 
                                                    width: '100%', 
                                                    objectFit: 'cover',
                                                    display: 'none' // Hide the video element
                                                }}
                                                preload="metadata"
                                                muted
                                                playsInline
                                            >
                                                <source src={media.url} type={media.mime} />
                                                {__("Your browser does not support the video tag.", "media-carousel-for-guten-blocks")}
                                            </video>
                                            
                                            {/* Display thumbnail or loading state */}
                                            {media.thumbnailUrl ? (
                                                <img 
                                                    src={media.thumbnailUrl} 
                                                    alt={media.alt || "Video Thumbnail"} 
                                                    style={{ 
                                                        width: '100%', 
                                                        objectFit: 'cover',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => {
                                                        // Show video controls when clicked
                                                        const videoElement = document.querySelector(`video[src="${media.url}"]`);
                                                        if (videoElement) {
                                                            videoElement.style.display = 'block';
                                                            videoElement.muted = false;
                                                            videoElement.play();
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <div style={{ textAlign: 'center' }}>
                                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#6c757d" style={{ marginBottom: '8px' }}>
                                                        <path d="M8 5v14l11-7z"/>
                                                    </svg>
                                                    <div style={{ fontSize: '12px', color: '#6c757d' }}>
                                                        {__("Generating thumbnail...", "media-carousel-for-guten-blocks")}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Play button overlay */}
                                            <div className="play-button-overlay" style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '60px',
                                                height: '60px',
                                                backgroundColor: 'rgba(0,0,0,0.7)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                zIndex: 2
                                            }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        {!fancybox && (
                                            <input
                                                type="text"
                                                className="ytb-url"
                                                value={urls[index] || ''}
                                                onChange={(event) => {
                                                    const updatedUrls = [...urls];
                                                    updatedUrls[index] = event.target.value;
                                                    setAttributes({ urls: updatedUrls });
                                                }}
                                                placeholder="Enter URL"
                                            />
                                        )}
                                        {caption && (
                                            <input
                                                type="text"
                                                className="caption-video"
                                                value={media.caption || ''}
                                                onChange={(event) => {
                                                    const updatedGallery = [...galleryImages];
                                                    updatedGallery[index].caption = event.target.value;
                                                    setAttributes({ galleryImages: updatedGallery });
                                                }}
                                                placeholder="Enter Caption"
                                            />
                                        )}
                                        {caption && (
                                            <textarea
                                                className="description-video"
                                                value={media.description || ''}
                                                onChange={(event) => {
                                                    const updatedGallery = [...galleryImages];
                                                    updatedGallery[index].description = event.target.value;
                                                    setAttributes({ galleryImages: updatedGallery });
                                                }}
                                                placeholder="Description"
                                                rows="3"
                                                style={{
                                                    width: '100%',
                                                    marginTop: '5px',
                                                    padding: '8px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    resize: 'vertical',
                                                    fontFamily: 'inherit',
                                                    fontSize: '14px'
                                                }}
                                            />
                                        )}

                                    </>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Placeholder
                        className="upload-part"
                        label="Add Gallery Image or Video"
                        instructions="Upload images or videos by clicking the button below."
                    >
                        <MediaUploadCheck>
                            <MediaUpload
                                multiple="add"
                                onSelect={(val) => {
                                    const newGallery = val.map((media) => ({
                                        id: media.id,
                                        url: media.url,
                                        alt: media.alt,
                                        type: media.type,
                                        caption: media.caption, // Include the caption field
                                        description: media.description || '', // Include the description field
                                    }));
                                    
                                    // Initialize URLs array with empty strings for new media
                                    const newUrls = new Array(newGallery.length).fill('');
                                    
                                    setAttributes({
                                        galleryImages: newGallery,
                                        urls: newUrls
                                    });
                                }}
                                allowedTypes={['image', 'video']}
                                value={galleryImages.map((val) => val.id)}
                                render={({ open }) => (
                                    <Button onClick={open} isPrimary className="upload-btn">
                                        <svg viewBox="0 0 24 24" width="24" ><g> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z"></path> </g> </g></svg>
                                        {__("Upload Media", "media-carousel-for-guten-blocks")}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </Placeholder>
                )}
                

            </div>

            <style>
                {`
                        .arrowclass.${arrowType}.${sliderId} input[type=radio]:checked + label svg g{
                            fill:${arrowColor} !important;
                        }
                        #${sliderId} .slider-boxwrap .mcfgb-gallery-single img , #${sliderId} .slider-boxwrap .mcfgb-gallery-single video{
                            border-radius: ${
                                (typeof borderRadiusTop !== 'undefined' && typeof borderRadiusRight !== 'undefined' && typeof borderRadiusBottom !== 'undefined' && typeof borderRadiusLeft !== 'undefined')
                                    ? `${borderRadiusTop || 0}px ${borderRadiusRight || 0}px ${borderRadiusBottom || 0}px ${borderRadiusLeft || 0}px`
                                    : `${borderRadius || 0}px`
                            } !important;
                        }
                        #${sliderId} .slider-boxwrap .mcfgb-gallery-single .video-thumbnail-container,
                        #${sliderId} .slider-boxwrap .mcfgb-gallery-single .video-thumbnail-wrapper {
                            border-radius: ${
                                (typeof borderRadiusTop !== 'undefined' && typeof borderRadiusRight !== 'undefined' && typeof borderRadiusBottom !== 'undefined' && typeof borderRadiusLeft !== 'undefined')
                                    ? `${borderRadiusTop || 0}px ${borderRadiusRight || 0}px ${borderRadiusBottom || 0}px ${borderRadiusLeft || 0}px`
                                    : `${borderRadius || 0}px`
                            } !important;
                            overflow: hidden;
                        }
                `}
            </style>
        </>
    );
}
