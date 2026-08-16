import type { Meta, StoryObj } from "@storybook/react-vite";
import { Image } from "./Image";
import { Stack } from "../Stack/Stack";

const DEMO_SRC = "https://picsum.photos/400/300";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  parameters: {
    docs: {
      description: {
        component:
          "Styled wrapper around the native `<img>` element for content images (photos, thumbnails, hero images). `alt` is required — pass `alt=\"\"` for a genuinely decorative image, otherwise describe the image's content. For a person/entity image with an initials fallback, use `Avatar` instead.",
      },
    },
  },
  argTypes: {
    fit: { control: "select", options: ["contain", "cover", "fill", "none"] },
    shape: { control: "select", options: ["square", "rounded", "circular"] },
    shadow: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: DEMO_SRC,
    alt: "A scenic placeholder photo",
    width: 400,
    height: 300,
  },
};

export const Shapes: Story = {
  render: () => (
    <Stack direction="horizontal" gap="4">
      <Image src={DEMO_SRC} alt="Square" shape="square" width={120} height={120} fit="cover" />
      <Image src={DEMO_SRC} alt="Rounded" shape="rounded" width={120} height={120} fit="cover" />
      <Image src={DEMO_SRC} alt="Circular" shape="circular" width={120} height={120} fit="cover" />
    </Stack>
  ),
};

export const BorderedAndShadow: Story = {
  args: {
    src: DEMO_SRC,
    alt: "Bordered with a shadow",
    shape: "rounded",
    bordered: true,
    shadow: "lg",
    width: 300,
    height: 200,
    fit: "cover",
  },
};

export const Block: Story = {
  render: () => (
    <div style={{ width: 320, border: "1px dashed var(--dym-color-border-default)" }}>
      <Image src={DEMO_SRC} alt="Fills its container" block shape="rounded" fit="cover" />
    </div>
  ),
};
