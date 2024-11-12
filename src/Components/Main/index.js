import TopMenu from './includes/TopMenu';

const MainLayout=()=> {
    return (
        <>
            <div id='MainLayout' className="min-w-[1050px] max-w-[1300px] mx-auto">
                <div>
                    <TopMenu />
                </div>
            </div>
        </>
    );
}

export default MainLayout;