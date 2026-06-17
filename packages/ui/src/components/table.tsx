import { cn } from "@workspace/ui/lib/utils";
import * as React from "react";

const Table = ({ className, ...props }: React.ComponentProps<"table">) => (
  <div className="relative w-full overflow-auto">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      data-slot="table"
      {...props}
    />
  </div>
);

const TableHeader = ({
  className,
  ...props
}: React.ComponentProps<"thead">) => (
  <thead
    className={cn("[&_tr]:border-b", className)}
    data-slot="table-header"
    {...props}
  />
);

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => (
  <tbody
    className={cn("[&_tr:last-child]:border-0", className)}
    data-slot="table-body"
    {...props}
  />
);

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => (
  <tr
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    data-slot="table-row"
    {...props}
  />
);

const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => (
  <th
    className={cn(
      "h-10 px-3 text-left align-middle font-medium text-foreground whitespace-nowrap",
      className
    )}
    data-slot="table-head"
    {...props}
  />
);

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => (
  <td
    className={cn("p-3 align-middle", className)}
    data-slot="table-cell"
    {...props}
  />
);

const TableCaption = ({
  className,
  ...props
}: React.ComponentProps<"caption">) => (
  <caption
    className={cn("mt-4 text-muted-foreground text-sm", className)}
    data-slot="table-caption"
    {...props}
  />
);

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
};
