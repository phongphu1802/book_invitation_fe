import {
  ForwardedRef,
  cloneElement,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

import { Container } from "../Container";
import { EndScrollDetectorProps, EndScrollDetectorRefType } from "./interface";
import { useConfig } from "../../Hooks";
import { ConfigKeyEnum } from "../../../App/Enums";

const EndScrollDetector = (
  { as, contentContainerRef, children, isShown, isTriggerEarly, onReach }: EndScrollDetectorProps,
  ref: ForwardedRef<EndScrollDetectorRefType>,
) => {
  const config = useConfig();

  const scrollEndScrollDetectorRef = useRef<HTMLDivElement>(null);
  const scrollHeightPercentage = useRef(
    Number(config(ConfigKeyEnum.PAGINATION_TRIGGER_PERCENT)) / 100 ?? 0.5,
  );

  const [firstChild, otherChildren] = useMemo(() => {
    if (!children) {
      return [null, null];
    }

    const [first, ...others] = Array.isArray(children) ? children : [children];

    return [first, others];
  }, [children]);

  const calculateDetectorPosition = useCallback(() => {
    const contentContainerEl = contentContainerRef?.current;
    const scrollEndScrollDetectorEl = scrollEndScrollDetectorRef.current;

    if (!contentContainerEl || !scrollEndScrollDetectorEl) {
      return;
    }

    const contentContainerHeight = contentContainerEl.clientHeight;

    const detectorMarginTop = -(contentContainerHeight * (1 - scrollHeightPercentage.current));

    scrollEndScrollDetectorEl.style.top = `${detectorMarginTop}px`;
  }, [contentContainerRef]);

  useEffect(() => {
    if (!scrollEndScrollDetectorRef.current) {
      return undefined;
    }

    const scrollEndScrollDetectorEl = scrollEndScrollDetectorRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const newScrollHeightPercentage = scrollHeightPercentage.current + 0.05;

        if (newScrollHeightPercentage <= 0.8) {
          scrollHeightPercentage.current = newScrollHeightPercentage;
        }

        onReach();
      }
    });

    observer.observe(scrollEndScrollDetectorEl);

    return () => {
      observer.unobserve(scrollEndScrollDetectorEl as Element);
    };
  }, [onReach]);

  useEffect(() => {
    if (isTriggerEarly) {
      calculateDetectorPosition();
    }
  }, [calculateDetectorPosition, isTriggerEarly]);

  useImperativeHandle(ref, () => ({
    calculatePosition: calculateDetectorPosition,
  }));

  if (as === "tr" && firstChild) {
    if (isTriggerEarly) {
      return (
        <>
          <tr className={twMerge("relative", !isShown && "hidden")}>
            <td>
              <div className="absolute bg-black" ref={scrollEndScrollDetectorRef} />
            </td>
          </tr>
          {isShown && children}
        </>
      );
    }

    return (
      <>
        {cloneElement(firstChild, {
          ref: scrollEndScrollDetectorRef,
          className: twMerge(firstChild.props.className, !isShown && "hidden"),
          "data-source": "end-scroll-detector-first-child",
        })}
        {isShown && otherChildren}
      </>
    );
  }

  return (
    <Container as={as} className={twMerge("relative block h-fit w-full", !isShown && "hidden")}>
      <div className={twMerge(isTriggerEarly && "absolute")} ref={scrollEndScrollDetectorRef} />
      {children}
    </Container>
  );
};

export default memo(forwardRef(EndScrollDetector));
