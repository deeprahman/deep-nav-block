import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save();
	
	return (
		<nav {...blockProps}>
			<div dangerouslySetInnerHTML={{ __html: attributes.menuItems }} />
		</nav>
	);
}