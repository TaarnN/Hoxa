import { useEffect, useRef } from "react";

export function useLogger(componentName: string, props?: Record<string, any>) {
  const previousProps = useRef<Record<string, any> | null>(null);

  useEffect(() => {
    console.log(`${componentName} mounted`);
    return () => console.log(`${componentName} unmounted`);
  }, [componentName]);

  useEffect(() => {
    if (previousProps.current && props) {
      const changes: Record<string, { from: any; to: any }> = {};

      Object.keys({ ...previousProps.current, ...props }).forEach((key) => {
        if (previousProps.current?.[key] !== props[key]) {
          changes[key] = {
            from: previousProps.current?.[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changes).length > 0) {
        console.log(`${componentName} props changed:`, changes);
      }
    }

    previousProps.current = props || null;
  });
}
