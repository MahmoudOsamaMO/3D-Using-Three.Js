CREATE TABLE [dbo].[ColdFormedDesignCodesTable] (
    [ColdFormedDesignCodes_ID] INT            IDENTITY (1, 1) NOT NULL,
    [ColdFormedDesignCodes]    NVARCHAR (150) NULL,
    CONSTRAINT [PK_ColdFormedDesignCodesTable] PRIMARY KEY CLUSTERED ([ColdFormedDesignCodes_ID] ASC)
);

