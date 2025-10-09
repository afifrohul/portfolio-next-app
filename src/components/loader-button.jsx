import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function LoaderButton({ ...props }) {
  return (
    <Button disabled {...props}>
      <Spinner />
      Loading...
    </Button>
  );
}
