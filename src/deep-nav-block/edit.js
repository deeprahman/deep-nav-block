import { useState, useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Spinner } from '@wordpress/components';

import apiFetch from '@wordpress/api-fetch';
import { parseMenuItems } from "./dnb-menuitem-parser";

export default function Edit({ attributes, setAttributes }) {
	const [navMenus, setNavMenus] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { selectedNav, menuItems } = attributes;
	const blockProps = useBlockProps();

	// Fetch available navigation menus
	useEffect(() => {
		apiFetch({ path: '/wp/v2/navigation' })
			.then((menus) => {
				setNavMenus(menus);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching navigation:', error);
				setIsLoading(false);
			});
	}, []);

	// Fetch specific navigation menu content
	useEffect(() => {
		if (selectedNav) {
			apiFetch({ path: `/dnb/v1/navigation/${selectedNav}` })
				.then((menu) => {
					setAttributes({
						menuItems: menu.data.content || ''
					});
				})
				.catch(console.error);
		}
	}, [selectedNav]);

	

	// Recursive render function for menu items
	const renderMenu = (items) => (
		<ul>
			{items.map((item) => (
				<li key={item.id}>
					<a href={item.url}>{item.title}</a>
					{item.children?.length > 0 && renderMenu(item.children)}
				</li>
			))}
		</ul>
	);

	if (isLoading) return <Spinner />;

	const menuTree = parseMenuItems(menuItems);
	console.log(menuTree);
	return (
		<>
			<InspectorControls>
				<PanelBody title="Navigation Settings">
					<SelectControl
						label="Select Menu"
						value={selectedNav}
						options={[
							{ label: 'Select a menu...', value: '' },
							...navMenus.map((menu) => ({
								label: menu.title.rendered,
								value: menu.id
							}))
						]}
						onChange={(value) => setAttributes({ selectedNav: Number(value) })}
					/>
				</PanelBody>
			</InspectorControls>

			<nav {...blockProps}>
				{menuTree.length > 0 ? (
					renderMenu(menuTree)
				) : (
					<p>Select a navigation menu from the sidebar</p>
				)}
			</nav>
		</>
	);
}